namespace Server.Models.DTOs.Music.NewMusic;

public class NewCollection
{
	public required string Title { get; set; }
	public DateTime ReleaseDate { get; set; }
	public int Type { get; set; }
	public IFormFile Cover { get; set; }

	public long AuthorId { get; set; }
	public ICollection<long> CollaboratorsIds { get; set; }
	public ICollection<byte> Genres { get; set; }
	public IEnumerable<NewSong> Songs { get; set; }
}