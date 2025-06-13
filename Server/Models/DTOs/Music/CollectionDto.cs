using Server.Models.Enums;

namespace Server.Models.DTOs.Music;

public class CollectionDto : MusicDto
{
  public required CollectionType Type { get; set; }
  public required IEnumerable<SongDto> Songs { get; set; }
}