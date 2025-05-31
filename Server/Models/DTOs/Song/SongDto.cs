using Server.Models.DTOs.User;
using Server.Models.Enums;

namespace Server.Models.DTOs.Song;

public class SongDto
{
  public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public DateOnly ReleaseDate { get; set; }
	public string Path { get; set; }
	public required DateTime PublicationDate { get; set; }
  
  public Artist Author { get; set; }
  public IEnumerable<Artist> Collaborators { get; set; }
  public IEnumerable<GenreEnum> Genres { get; set; }
}
