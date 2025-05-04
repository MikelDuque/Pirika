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

	public CollectionService(UnitOfWork unitOfWork, CollectionMapper collectionMapper, SongService songService)
	{
		_unitOfWork = unitOfWork;
		_collectionMapper = collectionMapper;
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

	public async Task SearchMusic()
	{

	}

	/* INSERT */

	public async Task<CollectionDto> Publish(NewCollection newCollection)
	{
		//Controlar tipo de audio e imagen que se recibe

		Collection thisCollection = _collectionMapper.ToEntity(newCollection);
		Collection publishedCollection = await _unitOfWork.CollectionRepository.InsertAsync(thisCollection);
		await _unitOfWork.SaveAsync();

		publishedCollection.Cover = await FileHelper.SaveCover(newCollection.Cover, publishedCollection.Id, newCollection.AuthorId);
		List<Song> publishedSongs = publishedCollection.Songs.ToList();

		for (int i = 0; i < newCollection.Songs.Count(); i++)
		{
			IFormFile songFile = newCollection.Songs.FirstOrDefault(song => song.Id == i).Song;

			publishedSongs[i].Cover = publishedCollection.Cover;
			publishedSongs[i].Path = await FileHelper.SaveSong(songFile, publishedSongs[i].Id, publishedCollection.Id, publishedCollection.AuthorId);
		}

		Collection updatedCollection = await _unitOfWork.CollectionRepository.UpdateAsync(publishedCollection);
		await _unitOfWork.SaveAsync();

		return _collectionMapper.ToDto(updatedCollection);

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