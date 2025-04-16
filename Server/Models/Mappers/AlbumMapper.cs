using Server.Database.Entities;
using Server.Models.DTOs;
using Server.Models.DTOs.Album;

namespace Server.Models.Mappers;

public class AlbumMapper
{
  private readonly ArtistMapper _artistMapper;
	private readonly SongMapper _songMapper;

  public AlbumMapper(ArtistMapper artistMapper, SongMapper songMapper)
  {
    _artistMapper = artistMapper;
		_songMapper = songMapper;
  }

  //To Entity
	public Album ToEntity(NewAlbum album)
	{
		return new Album
		{
			Title = album.Title,
      Cover = "",
      ReleaseYear = album.ReleaseYear,
      PublicationDate = DateTime.Now,
			AuthorId = album.AuthorId,
			Songs = _songMapper.ToEntity(album.Songs).ToList()
		};
	}

	public IEnumerable<Album> ToEntity(IEnumerable<NewAlbum> albums)
	{
		return albums.Select(ToEntity);
	}

	//To Dto
	public AlbumDto ToDto(Album album)
	{
		return new AlbumDto
		{
			Id = album.Id,
      Title = album.Title,
      Cover = album.Cover,
      ReleaseYear = album.ReleaseYear,
      PublicationDate = album.PublicationDate,
      Author = _artistMapper.ToDto(album.Author),
			Collaborators = _artistMapper.ToDto(album.Collaborators).ToList(),
			Songs = _songMapper.ToDto(album.Songs).ToList()
		};
	}

	public IEnumerable<AlbumDto> ToDto(IEnumerable<Album> albums)
	{
		return albums.Select(ToDto);
	}
}