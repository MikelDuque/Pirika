using Microsoft.EntityFrameworkCore;
using Server.Database.Entities.Relationships;
using Server.Models.Enums;

namespace Server.Database.Entities;

[Index(nameof(Mail), IsUnique = true), Index(nameof(Username), IsUnique = true)]
public class User
{
	public long Id { get; set; }
	public string DisplayName { get; set; }
	public required string Username { get; set; }
	public required string Mail { get; set; }
	public required string Password { get; set; }
	public string Avatar {  get; set; }
	public Role	Role { get; set; }
	public bool IsBanned { get; set; }

	/* 1-M Relationships */
	public IEnumerable<Collection> Collections { get; }
	public IEnumerable<Song> Songs { get; }

	/* M-N Relationships */
	public IEnumerable<Collection> CollabCollections { get; }
	public IEnumerable<Song> CollabSongs { get; }
		public IEnumerable<Collaboration> Collaborations { get; set; }
		public IEnumerable<Queue> Queue { get; set; } = [];
}