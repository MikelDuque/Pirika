using Microsoft.OpenApi.Extensions;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;
using Server.Models.DTOs.Song;
using Server.Models.Enums;

namespace Server.Models.Mappers;

public class GenreMapper
{
	//GenreEnum To Genre Entity
	public Genre ToEntity(GenreEnum genre)
	{
		return new Genre
		{
			Name = genre.GetDisplayName(),
		};
	}

	public IEnumerable<Genre> ToEntity(IEnumerable<GenreEnum> genres)
	{
		return genres.Select(ToEntity);
	}

	//GenreEnum To SongGenre Entity
	public SongGenre ToEntity(byte genre, long songId)
	{
		return new SongGenre
		{
			GenreId = genre,
			SongId = songId
		};
	}

	public IEnumerable<SongGenre> ToEntity(IEnumerable<byte> genres, long songId)
	{
		return genres.Select(genre => ToEntity(genre, songId));
	}

	//Genre To Enum
	public GenreEnum ToEnum(Genre genre)
	{
		return (GenreEnum)genre.Id;
	}

	public IEnumerable<GenreEnum> ToEnum(IEnumerable<Genre> genres)
	{
		return genres.Select(ToEnum);
	}

	////SongGenre To Enum
	//public GenreEnum ToEnum(SongGenre genre)
	//{
	//	return (GenreEnum)genre.GenreId;
	//}

	//public IEnumerable<GenreEnum> ToEnum(IEnumerable<SongGenre> genres)
	//{
	//	return genres.Select(ToEnum);
	//}

	////CollectionGenre To Enum
	//public GenreEnum ToEnum(CollectionGenre genre)
	//{
	//	return (GenreEnum)genre.GenreId;
	//}

	//public IEnumerable<GenreEnum> ToEnum(IEnumerable<CollectionGenre> genres)
	//{
	//	return genres.Select(ToEnum);
	//}
}