using Server.Models.DTOs.Song;

namespace Server.Models.DTOs.User;

public class QueueDto
{
  public required long UserId { get; set; }
  public required ICollection<SongDto> SongList { get; set; } = [];
}
