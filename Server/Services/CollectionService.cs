using Server.Database;
using Server.Database.Entities;
using Server.Helpers;
using Server.Models.DTOs;
using Server.Models.DTOs.Collection;
using Server.Models.Mappers;

namespace Server.Services;

public class CollectionService
{
  private readonly UnitOfWork _unitOfWork;
	private readonly CollectionMapper _collectionMapper;
	private readonly SongService _songService;

	public CollectionService(UnitOfWork unitOfWork, CollectionMapper collectionMapper, SongService songService)
	{
		_unitOfWork = unitOfWork;
		_collectionMapper = collectionMapper;
		_songService = songService;
	}

	/* GET */

	public async Task<IEnumerable<CollectionDto>> GetAllCollections()
	{
		return _collectionMapper.ToDto(await _unitOfWork.CollectionRepository.GetAllAsync());
	}

	public async Task<CollectionDto> GetCollection(long collectionId)
	{
		Collection collection = await _unitOfWork.CollectionRepository.GetByIdAsync(collectionId);

		return _collectionMapper.ToDto(collection);
	}

	/* INSERT */

	public async Task<bool> Publish(NewCollection newCollection)
	{
		//Controlar tipo de audio e imagen que se recibe

		Collection thisCollection = _collectionMapper.ToEntity(newCollection);
		Collection publishedCollection = await _unitOfWork.CollectionRepository.InsertAsync(thisCollection);
		await _unitOfWork.SaveAsync();
		publishedCollection.Cover = await FileHelper.SaveCover(newCollection.Cover, publishedCollection.Id, newCollection.AuthorId);

		IEnumerable<Song> publishedSongs = await _songService.PublishSongs(newCollection.Songs, publishedCollection);
		publishedCollection.Songs = publishedSongs;
		await _unitOfWork.CollectionSongRepository.InsertAsync(publishedSongs, publishedCollection.Id);

		return await _unitOfWork.SaveAsync();

		/*
		1º Insert collection + songs
		1.5º Save async
		2º Cover + file songs
		3º update con eso
		4º Save Async
		*/
	}

	/* DELETE */

	public async Task<bool> Delete(long id)
	{
		Collection thisCollection = await _unitOfWork.CollectionRepository.GetByIdAsync(id);
		_unitOfWork.CollectionRepository.Delete(thisCollection);
		return await _unitOfWork.CollectionRepository.SaveAsync();
	}
}