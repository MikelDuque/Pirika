using Server.Database.Entities;
using Server.Helpers;
using Server.Models.DTOs.Song;

namespace Server.Models.Mappers;

public class SongMapper
{
  private readonly ArtistMapper _artistMapper;
	private readonly GenreMapper _genreMapper;

  public SongMapper(ArtistMapper artistMapper, GenreMapper genreMapper)
  {
    _artistMapper = artistMapper;
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
			Author = _artistMapper.ToDto(song.Author),
			Collaborators = song.Collaborators != null ? _artistMapper.ToDto(song.Collaborators) : [],
			Genres = _genreMapper.ToEnum(song.Genres)
		};
	}

	public IEnumerable<SongDto> ToDto(IEnumerable<Song> songs)
	{
		return songs.Select(ToDto);
	}
}