using Server.Models.Enums;

namespace Server.Models.DTOs.Filter;

public class FilterItem
{
	public long Id { get; set; }
	public string Name { get; set; }
	public string Image {  get; set; }
	public ItemType Type { get; set; }
}
