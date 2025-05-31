namespace Server.Models.DTOs.Song;

public class NewSong
{
	public long Id { get; set; }
	public required string Title { get; set; }
	public IFormFile Cover { get; set; }
	public DateOnly ReleaseDate { get; set; }
  public required IFormFile Song { get; set; }
	public required DateTime PublicationDate { get; set; }

  public long AuthorId { get; set; }
  public IEnumerable<long> CollaboratorsIds { get; set; }
	public IEnumerable<byte> Genres { get; set; }
}