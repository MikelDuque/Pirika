using Server.Models.Enums;

namespace Server.Models.DTOs.Music;

public class SongDto : MusicDto
{
	public string Path { get; set; }
}
