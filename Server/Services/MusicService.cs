using eCommerce.Services;
using Server.Database;
using Server.Database.Entities;
using Server.Helpers;
using Server.Models.DTOs;
using Server.Models.DTOs.Filter;
using Server.Models.DTOs.Music;
using Server.Models.DTOs.Music.NewMusic;
using Server.Models.Enums;
using Server.Models.Mappers;

namespace Server.Services;

public class MusicService
{
	private readonly UnitOfWork _unitOfWork;
	private readonly CollectionMapper _collectionMapper;
	private readonly SongMapper _songMapper;
	private readonly BasicElementMapper _filterMapper;

	public MusicService(UnitOfWork unitOfWork, CollectionMapper collectionMapper, SongMapper songMapper, BasicElementMapper filterMapper)
	{
		_unitOfWork = unitOfWork;
		_collectionMapper = collectionMapper;
		_songMapper = songMapper;
		_filterMapper = filterMapper;
	}

	/* GET */
	public async Task<CollectionDto> GetCollection(long collectionId)
	{
		Collection collection = await _unitOfWork.CollectionRepository.GetIncludesByIdAsync(collectionId);

		return _collectionMapper.ToDto(collection);
	}

	public async Task<SongDto> GetSong(long songId)
	{
		Song song = await _unitOfWork.SongRepository.GetIncludesByIdAsync(songId);

		return _songMapper.ToDto(song);
	}

	public async Task<IEnumerable<BasicElement>> SearchMusic(Filter filter)
	{
		//Filter types
		IEnumerable<ElementType> types = filter.Types.Any()
			? filter.Types.Select(type => (ElementType)type)
			: [ElementType.Song, ElementType.Collection, ElementType.Artist];

		//Music query
		IEnumerable<Music> music = _unitOfWork.MusicRepository.ApplyFilter(filter, types);

		//User query
		IEnumerable<User> users = types.Contains(ElementType.Artist)
			? await _unitOfWork.UserRepository.GetAllAsync()
			: Enumerable.Empty<User>();

		//Result
		IEnumerable<BasicElement> result = _filterMapper.ToDto(music).Concat(_filterMapper.ToDto(users));
		result = TextHelper.SearchFilter<BasicElement>(result, filter.Search, item => item.Name);

		if (filter.ItemsPerPage > 0 && filter.ItemsPerPage > 0)
		{
			int skip = (filter.CurrentPage - 1) * filter.ItemsPerPage;
			result = result.Skip(skip).Take(filter.ItemsPerPage);
		}

		return result;
	}


	/* INSERT */
	public async Task<bool> Publish(NewCollection newCollection)
	{
		if (newCollection.Cover == null | newCollection.Songs.Any(song => song.Song == null)) throw new Exception(message: "No se ha adjuntado todos los archivos requeridos");

		Collection thisCollection = _collectionMapper.ToEntity(newCollection);
		Collection publishedCollection = await _unitOfWork.CollectionRepository.InsertAsync(thisCollection);
		await _unitOfWork.SaveAsync();

		publishedCollection.Cover = await FileHelper.SaveCover(newCollection.Cover, publishedCollection.Id, newCollection.AuthorId);

		List<Song> publishedSongs = publishedCollection.Songs.ToList();
		List<NewSong> newSongs = newCollection.Songs.ToList();

		//HashSet<long> collaborators = new();
		//HashSet<byte> genres = new();

		for (int i = 0; i < publishedSongs.Count(); i++)
		{
			IFormFile songFile = newSongs[i].Song;

			publishedSongs[i].Cover = publishedCollection.Cover;
			publishedSongs[i].Path = await FileHelper.SaveSong(songFile, publishedSongs[i].Id, publishedCollection.Id, publishedCollection.AuthorId);

			_unitOfWork.SongRepository.Update(publishedSongs[i]);
		}

		//Collection updatedCollection = await _unitOfWork.CollectionRepository.UpdateAsync(publishedCollection);
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