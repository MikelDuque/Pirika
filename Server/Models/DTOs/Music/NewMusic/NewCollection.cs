namespace Server.Models.DTOs.Music.NewMusic;

public class NewCollection
{
	public required string Title { get; set; }
	public DateOnly ReleaseDate { get; set; }
	public int Type { get; set; }
	public IFormFile Cover { get; set; }

	public long AuthorId { get; set; }
	public IEnumerable<long> CollaboratorsIds { get; set; }
	public IEnumerable<byte> Genres { get; set; }
	public IEnumerable<NewSong> Songs { get; set; }
}