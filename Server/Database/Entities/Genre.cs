using Server.Database.Entities.Relationships;

namespace Server.Database.Entities;

public class Genre
{
	public long Id { get; set; }
	public string Name { get; set; }

	/* M-N Relationships */
	public IEnumerable<Music> Musics { get; set; }
}