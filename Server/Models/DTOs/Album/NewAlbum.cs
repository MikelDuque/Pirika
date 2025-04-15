using Server.Models.DTOs.Song;

namespace Server.Models.DTOs;

public class NewAlbum
{
	public required string Title { get; set; }
	public int ReleaseYear { get; set; }
	public IFormFile Cover { get; set; }

	public long AuthorId { get; set; }
	public ICollection<long> CollaboratorsIds { get; set; }
	public ICollection<byte> Genres { get; set; }
	public ICollection<NewSong> Songs { get; set; }
}
