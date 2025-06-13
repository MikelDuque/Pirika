namespace Server.Database.Entities;

public class Song : Music
{
	public required string Path { get; set; }

	/* M-N Relationships */
	public IEnumerable<Collection> Collections { get; set; } = new List<Collection>();
}