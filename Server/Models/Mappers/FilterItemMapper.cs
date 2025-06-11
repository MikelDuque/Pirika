using Server.Database.Entities;
using Server.Models.DTOs.Filter;
using Server.Models.Enums;

namespace Server.Models.Mappers;

public class FilterItemMapper
{
	public FilterItem ToDto(Music music)
	{
		return new FilterItem
		{
			Id = music.Id,
			Name = music.Title,
			Image = music.Cover,
			Type = music is Song ? ItemType.Song : ItemType.Collection
		};
	}
	public FilterItem ToDto(User user)
	{
		return new FilterItem
		{
			Id = user.Id,
			Name = user.DisplayName,
			Image = user.Avatar,
			Type = ItemType.Artist
		};
	}

	public IEnumerable<FilterItem> ToDto(IEnumerable<Music> music)
	{
		return music.Select(ToDto);
	}
	public IEnumerable<FilterItem> ToDto(IEnumerable<User> user)
	{
		return user.Select(ToDto);
	}
}
