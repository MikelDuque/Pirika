namespace Server.Models.DTOs.Song;

public class NewSong
{
  public required string Title { get; set; }
	public int ReleaseYear { get; set; }
  public required IFormFile Song { get; set; }
  public IFormFile Cover { get; set; }
	public required DateTime PublicationDate { get; set; }

  public long AuthorId { get; set; }
  public ICollection<long> CollaboratorsIds { get; set; }
	public ICollection<byte> Genres { get; set; }
}