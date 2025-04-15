using Server.Models.DTOs.Song;
using Server.Models.DTOs.User;
using Server.Models.Enums;

namespace Server.Models.DTOs.Album;

public class AlbumDto
{
  public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public int ReleaseYear { get; set; }
	public required DateTime PublicationDate { get; set; }
  
  public required Artist Author { get; set; }
  public ICollection<Artist> Collaborators { get; set; }
  public ICollection<GenreEnum> Genres { get; set; }
  public required ICollection<SongDto> Songs { get; set; }
}