using Server.Database;
using Server.Database.Entities;
using Server.Helpers;
using Server.Models.DTOs.Song;
using Server.Models.Mappers;

namespace Server.Services;

public class SongService
{
	private readonly UnitOfWork _unitOfWork;
	private readonly SongMapper _songMapper;
	private readonly GenreMapper _genreMapper;
	private readonly CollaborationMapper _collabMapper;

	public SongService(UnitOfWork unitOfWork, SongMapper songMapper, GenreMapper genreMapper, CollaborationMapper collabMapper)
	{
		_unitOfWork = unitOfWork;
		_songMapper = songMapper;
		_genreMapper = genreMapper;
		_collabMapper = collabMapper;
	}

	/* GET */

	public async Task<IEnumerable<SongDto>> GetAllSongs()
	{
		return _songMapper.ToDto(await _unitOfWork.SongRepository.GetAllAsync());
	}

	public async Task<SongDto> GetSong(long songId)
	{
		Song song = await _unitOfWork.SongRepository.GetByIdAsync(songId);

		return _songMapper.ToDto(song);
	}

	/* INSERT */

	public async Task<IEnumerable<Song>> PublishSongs(IEnumerable<NewSong> newSongs, Collection collection)
	{
		IEnumerable<Song> publishedSongs = [];

		foreach (NewSong newSong in newSongs)
		{
			Song thisSong = await Publish(newSong, collection);

			if (thisSong != null) publishedSongs.Append(thisSong);
		}

		await _unitOfWork.SaveAsync();
		return publishedSongs;
	}

	private async Task<Song> Publish(NewSong newSong, Collection collection)
	{
		Song publishedSong = await _unitOfWork.SongRepository.GetByIdAsync(newSong.Id);

		if (newSong.Id > 0 && publishedSong == null)
		{
			publishedSong = await _unitOfWork.SongRepository.InsertAsync(_songMapper.ToEntity(newSong));

			publishedSong.Path = await FileHelper.SaveSong(newSong.Song, publishedSong.Id, collection.Id, collection.AuthorId);
			publishedSong.Cover = collection.Cover;

			publishedSong.SongGenres = _genreMapper.ToEntity(newSong.Genres, publishedSong.Id);
			publishedSong.Collaborations = _collabMapper.ToEntity(newSong.CollaboratorsIds, publishedSong.Id);
			//await _unitOfWork.SaveAsync();
		}

		return publishedSong;
	}

	/* DELETE */

	public async Task<bool> Delete(long id)
	{
		Song thisSong = await _unitOfWork.SongRepository.GetByIdAsync(id);
		_unitOfWork.SongRepository.Delete(thisSong);
		return await _unitOfWork.SongRepository.SaveAsync();
	}
}
