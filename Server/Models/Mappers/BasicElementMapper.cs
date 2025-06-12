using Server.Database.Entities;
using Server.Models.DTOs;
using Server.Models.Enums;

namespace Server.Models.Mappers;

public class BasicElementMapper
{
	public BasicElement ToDto(Music music)
	{
		return new BasicElement
		{
			Id = music.Id,
			Name = music.Title,
			Image = music.Cover,
			Type = music is Song ? ElementType.Song : ElementType.Collection
		};
	}
	public BasicElement ToDto(User user)
	{
		return new BasicElement
		{
			Id = user.Id,
			Name = user.DisplayName,
			Image = user.Avatar,
			Type = ElementType.Artist
		};
	}

	public IEnumerable<BasicElement> ToDto(IEnumerable<Music> music)
	{
		return music.Select(ToDto);
	}
	public IEnumerable<BasicElement> ToDto(IEnumerable<User> user)
	{
		return user.Select(ToDto);
	}
}
