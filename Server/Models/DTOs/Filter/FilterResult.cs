using Server.Models.DTOs.Collection;
using Server.Models.DTOs.Song;
using Server.Models.DTOs.User;

namespace Server.Models.DTOs.Filter;

public class FilterResult
{
	public IEnumerable<SongDto> Songs { get; set; }
	public IEnumerable<CollectionDto> Collections { get; set; }
	public IEnumerable<Artist> Artists { get; set; }
}