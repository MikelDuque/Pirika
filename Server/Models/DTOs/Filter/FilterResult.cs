using Server.Models.DTOs.Music;

namespace Server.Models.DTOs.Filter;

public class FilterResult
{
	public IEnumerable<SongDto> Songs { get; set; }
	public IEnumerable<CollectionDto> Collections { get; set; }
	public IEnumerable<Artist> Artists { get; set; }
}