namespace Server.Database.Entities;

public class Album
{
	public long Id { get; set; }
	public required string Title { get; set; }
	public string Cover { get; set; }
	public byte ReleaseYear { get; set; }
	public required DateOnly PublicationDate { get; set; }

	public List<Song> Songs { get; set; } = [];
	public List<Genre> Genres { get; set; } = [];
}
