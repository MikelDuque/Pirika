using Server.Models.DTOs.Song;
using Server.Models.Enums;

namespace Server.Models.DTOs.Collection;

public class CollectionDto
{
  public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public DateOnly ReleaseDate { get; set; }
	public required DateTime PublicationDate { get; set; }
  public required CollectionType Type { get; set; }
  
  public BasicElement Author { get; set; }
  public IEnumerable<BasicElement> Collaborators { get; set; }
  public IEnumerable<GenreEnum> Genres { get; set; }
  public required IEnumerable<SongDto> Songs { get; set; }
}