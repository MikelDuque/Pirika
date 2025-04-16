using Server.Database.Entities;
using Server.Models.DTOs.Song;

namespace Server.Models.Mappers;

public class SongMapper
{
  private readonly ArtistMapper _artistMapper;
  public SongMapper(ArtistMapper artistMapper)
  {
    _artistMapper = artistMapper;
  }

  //To Entity
	public Song ToEntity(NewSong song)
	{
		return new Song
		{
			Title = song.Title,
      SongPath = "",  //Llamar a los helpers
      Cover = "",
      ReleaseYear = song.ReleaseYear,
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
      ReleaseYear = song.ReleaseYear,
      PublicationDate = song.PublicationDate,
      Author = _artistMapper.ToDto(song.Author)
		};
	}

	public IEnumerable<SongDto> ToDto(IEnumerable<Song> songs)
	{
		return songs.Select(ToDto);
	}
}