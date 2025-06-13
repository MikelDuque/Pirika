using Server.Database.Entities;
using Server.Models.DTOs.Music;
using Server.Models.DTOs.Music.NewMusic;

namespace Server.Models.Mappers;

public class SongMapper
{
	private readonly BasicElementMapper _itemMapper;
	private readonly GenreMapper _genreMapper;

	public SongMapper(BasicElementMapper itemMapper, GenreMapper genreMapper)
	{
		_itemMapper = itemMapper;
		_genreMapper = genreMapper;
	}

	//To Entity
	public Song ToEntity(NewSong song)
	{
		return new Song
		{
			Title = song.Title,
			Path = "",
			Cover = "",
			ReleaseDate = song.ReleaseDate,
			AuthorId = song.AuthorId,
			PublicationDate = DateTime.Now
		};
	}

	public IEnumerable<Song> ToEntity(IEnumerable<NewSong> songs)
	{
		return songs.Select(ToEntity);
	}

	//To Dto
	public SongDto ToDto(Song song)
	{
		return new SongDto
		{
			Id = song.Id,
			Title = song.Title,
			Cover = song.Cover,
			Path = song.Path,
			ReleaseDate = song.ReleaseDate,
			PublicationDate = song.PublicationDate,
			Author = _itemMapper.ToDto(song.Author),
			Collaborators = song.Collaborations != null ? _itemMapper.ToDto(song.Collaborations.Where(c => c.MusicId == song.Id).Select(c => c.User)) : [],
			Genres = _genreMapper.ToEnum(song.Genres)
		};
	}

	public IEnumerable<SongDto> ToDto(IEnumerable<Song> songs)
	{
		return songs.Select(ToDto);
	}
}