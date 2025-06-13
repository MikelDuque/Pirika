using Server.Database.Entities;
using Server.Models.DTOs.Music;
using Server.Models.DTOs.Music.NewMusic;
using Server.Models.Enums;

namespace Server.Models.Mappers;

public class CollectionMapper
{
	private readonly BasicElementMapper _itemMapper;
	private readonly SongMapper _songMapper;
	private readonly GenreMapper _genreMapper;

	public CollectionMapper(BasicElementMapper itemMapper, SongMapper songMapper, GenreMapper genreMapper)
  {
		_itemMapper = itemMapper;
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
      Author = _itemMapper.ToDto(collection.Author),
			Type = collection.Type,
			Collaborators = collection.Collaborations != null ? _itemMapper.ToDto(collection.Collaborations.Where(c => c.MusicId == collection.Id).Select(c => c.User)) : [],
			Songs = _songMapper.ToDto(collection.Songs),
			Genres = _genreMapper.ToEnum(collection.Genres)
		};
	}

	public IEnumerable<CollectionDto> ToDto(IEnumerable<Collection> collections)
	{
		return collections.Select(ToDto);
	}
}