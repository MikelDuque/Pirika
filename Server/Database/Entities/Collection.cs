using System.ComponentModel.DataAnnotations.Schema;
using Server.Database.Entities.Relationships;
using Server.Models.Enums;

namespace Server.Database.Entities;

public class Collection
{
	public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public required DateOnly ReleaseDate { get; set; }
	public required DateTime PublicationDate { get; set; }
	public required CollectionType Type { get; set; }

	/* 1-M Relationships */
	[ForeignKey("Author")]
	public long AuthorId { get; set; }
	public User Author { get; set; }

	/* M-N Relationships */
	public IEnumerable<Song> Songs { get; set; } = new List<Song>();
		public IEnumerable<CollectionSong> CollectionSongs { get; set; } = new List<CollectionSong>();
	public IEnumerable<Genre> Genres { get; set; } = new List<Genre>();
		public IEnumerable<CollectionGenre> CollectionGenres { get; set; } = new List<CollectionGenre>();
	public IEnumerable<User> Collaborators { get; set; }
}