using System.ComponentModel.DataAnnotations.Schema;
using Server.Database.Entities.Relationships;

namespace Server.Database.Entities;

public abstract class Music
{
	public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public required DateOnly ReleaseDate { get; set; }
	public required DateTime PublicationDate { get; set; }

	/* 1-M Relationships */
	[ForeignKey("Author")]
	public long AuthorId { get; set; }
	public User Author { get; }

	/* M-N Relationships */
	public IEnumerable<Genre> Genres { get; }
	public ICollection<Collaboration> Collaborations { get; set; }
}