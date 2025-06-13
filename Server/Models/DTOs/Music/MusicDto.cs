using Server.Models.Enums;

namespace Server.Models.DTOs.Music;

public abstract class MusicDto
{
	public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public DateOnly ReleaseDate { get; set; }
	public required DateTime PublicationDate { get; set; }

	public BasicElement Author { get; set; }
	public IEnumerable<BasicElement> Collaborators { get; set; }
	public IEnumerable<GenreEnum> Genres { get; set; }
}
