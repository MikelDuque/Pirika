using System.ComponentModel.DataAnnotations.Schema;
using Server.Database.Entities.Relationships;

namespace Server.Database.Entities;

public class Song : Music
{
	//public long Id { get; set; }
	//public required string Title { get; set; }
	public required string Path { get; set; }
	//public string Cover { get; set; }
	//public required DateOnly ReleaseDate { get; set; }
	//public required DateTime PublicationDate { get; set; }

	/* 1-M Relationships */
	//[ForeignKey("Author")]
	//public long AuthorId { get; set; }
	//public User Author { get; set; }

	/* M-N Relationships */
	public IEnumerable<Collection> Collections { get; set; } = new List<Collection>();
		//public IEnumerable<CollectionSong> CollectionSongs { get; set; } = new List<CollectionSong>();
	//public IEnumerable<Genre> Genres { get; } = new List<Genre>();
	//	public IEnumerable<SongGenre> SongGenres { get; set; } = new List<SongGenre>();
	//public IEnumerable<User> Collaborators { get; set; }
		//public IEnumerable<Collaboration> Collaborations { get; set; }
}