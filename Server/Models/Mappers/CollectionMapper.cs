using Server.Database.Entities;
using Server.Helpers;
using Server.Models.DTOs;
using Server.Models.DTOs.Collection;
using Server.Models.Enums;

namespace Server.Models.Mappers;

public class CollectionMapper
{
  private readonly ArtistMapper _artistMapper;
	private readonly SongMapper _songMapper;
	private readonly GenreMapper _genreMapper;

	public CollectionMapper(ArtistMapper artistMapper, SongMapper songMapper, GenreMapper genreMapper)
  {
    _artistMapper = artistMapper;
		_songMapper = songMapper;
		_genreMapper = genreMapper;
  }

  //To Entity
	public Collection ToEntity(NewCollection collection)
	{
		return new Collection
		{
			Title = collection.Title,
      ReleaseDate = collection.ReleaseDate,
      PublicationDate = DateTime.Now,
			AuthorId = collection.AuthorId,
			Type = (CollectionType)collection.Type,
			Songs = _songMapper.ToEntity(collection.Songs)
		};
	}

	public IEnumerable<Collection> ToEntity(IEnumerable<NewCollection> collections)
	{
		return collections.Select(ToEntity);
	}

	//To Dto
	public CollectionDto ToDto(Collection collection)
	{
		return new CollectionDto
		{
			Id = collection.Id,
      Title = collection.Title,
      Cover = collection.Cover,
      ReleaseDate = collection.ReleaseDate,
      PublicationDate = collection.PublicationDate,
      //Author = _artistMapper.ToDto(collection.Author),
			Type = collection.Type,
			Collaborators = collection.Collaborators != null ? _artistMapper.ToDto(collection.Collaborators) : [],
			Songs = _songMapper.ToDto(collection.Songs),
			Genres = _genreMapper.ToEnum(collection.Genres)
		};
	}

	public IEnumerable<CollectionDto> ToDto(IEnumerable<Collection> collections)
	{
		return collections.Select(ToDto);
	}
}