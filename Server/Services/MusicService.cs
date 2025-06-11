using System;
using System.Linq;
using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Server.Database;
using Server.Database.Entities;
using Server.Helpers;
using Server.Models.DTOs;
using Server.Models.DTOs.Collection;
using Server.Models.DTOs.Filter;
using Server.Models.DTOs.Song;
using Server.Models.Enums;
using Server.Models.Mappers;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Server.Services;

public class MusicService
{
  private readonly UnitOfWork _unitOfWork;
	private readonly CollectionMapper _collectionMapper;
	private readonly SongMapper _songMapper;
	private readonly ArtistMapper _artistMapper;
	private readonly FilterItemMapper _filterMapper;

	public MusicService(UnitOfWork unitOfWork, CollectionMapper collectionMapper, SongMapper songMapper, ArtistMapper artistMapper, FilterItemMapper filterMapper)
	{
		_unitOfWork = unitOfWork;
		_collectionMapper = collectionMapper;
		_songMapper = songMapper;
		_artistMapper = artistMapper;
		_filterMapper = filterMapper;
	}

	/* GET */

	public async Task<IEnumerable<CollectionDto>> GetAllCollections()
	{
		return _collectionMapper.ToDto(await _unitOfWork.CollectionRepository.GetAllAsync());
	}

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

	public IEnumerable<FilterItem> SearchMusic(Filter filter)
	{
		//Filter types
		IEnumerable<ItemType> types = filter.Types.Any()
			? filter.Types.Select(type => (ItemType)type)
			: [ItemType.Song, ItemType.Collection, ItemType.Artist];

		//Music query
		IQueryable<Music> music = _unitOfWork.MusicRepository.GetQueryable()
			.Where(music => !filter.Genres.Any() || music.Genres
				.Any(genre => filter.Genres
					.Contains((byte)genre.Id)));

		music = (types.Contains(ItemType.Song), types.Contains(ItemType.Collection)) switch
		{
			(true, false) => music.OfType<Song>(),
			(false, true) => music.OfType<Collection>(),
			(false, false) => music.Where(_ => false),
			_ => music
		};

		//User query
		IQueryable<User> users = types.Contains(ItemType.Artist)
			? _unitOfWork.UserRepository.GetQueryable()
			: Enumerable.Empty<User>().AsQueryable();

		//Result
		IEnumerable<FilterItem> result = _filterMapper.ToDto(music).Concat(_filterMapper.ToDto(users));
		result = TextHelper.SearchFilter<FilterItem>(result, filter.Search, item => item.Name);

		if (filter.ItemsPerPage > 0 && filter.ItemsPerPage > 0)
		{
			int skip = (filter.CurrentPage - 1) * filter.ItemsPerPage;
			result = result.Skip(skip).Take(filter.ItemsPerPage);
		}

		return result;
	}

	public async Task<FilterResult> SearchMusicOld(Filter filter)
	{
		FilterResult filterResult = new();

		if (filter.Types.Contains((byte)ItemType.Song))
		{
			IEnumerable<Song> filteredSongs = await _unitOfWork.SongRepository.GetFilteredSongs(filter);

			filterResult.Songs = _songMapper.ToDto(filteredSongs);
		}

		if (filter.Types.Contains((byte)ItemType.Collection))
		{
			IEnumerable<Collection> filteredCollection = await _unitOfWork.CollectionRepository.GetFilteredSongs(filter);

			filterResult.Collections = _collectionMapper.ToDto(filteredCollection);
		}

		if (filter.Types.Contains((byte)ItemType.Artist))
		{
			IEnumerable<User> filteredUsers = await _unitOfWork.UserRepository.GetFilteredSongs(filter);

			filterResult.Artists = _artistMapper.ToDto(filteredUsers);
		}

		return filterResult;
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