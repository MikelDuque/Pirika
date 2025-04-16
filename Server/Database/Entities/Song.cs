using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Database.Entities;

public class Song
{
	public long Id { get; set; }
	public required string Title { get; set; }
	public required string SongPath { get; set; }
	public string Cover { get; set; }
	public required DateOnly ReleaseDate { get; set; }
	public required DateTime PublicationDate { get; set; }

	/* 1-M Relationships */
	[ForeignKey("Author")]
	public long AuthorId { get; set; }
	public User Author { get; set; }

	/* M-N Relationships */
	public ICollection<Collection> Collections { get; set; } = [];
	public ICollection<Genre> Genres { get; set; } = [];
	public ICollection<User> Collaborators { get; set; }
	public ICollection<Queue> Queue { get; set; }
}