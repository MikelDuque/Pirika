using Microsoft.OpenApi.Extensions;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;
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

	//GenreEnum To MusicGenre Entity
	//public GenreMusic ToEntity(byte genre, long musicId)
	//{
	//	return new GenreMusic
	//	{
	//		GenreId = genre,
	//		MusicId = musicId
	//	};
	//}

	//public IEnumerable<GenreMusic> ToEntity(IEnumerable<byte> genres, long musicId)
	//{
	//	return genres.Select(genre => ToEntity(genre, musicId));
	//}

	//Genre To Enum
	public GenreEnum ToEnum(Genre genre)
	{
		return (GenreEnum)genre.Id;
	}

	public IEnumerable<GenreEnum> ToEnum(IEnumerable<Genre> genres)
	{
		return genres.Select(ToEnum);
	}
}