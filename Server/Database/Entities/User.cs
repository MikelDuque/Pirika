using Microsoft.EntityFrameworkCore;
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
	public RoleEnum	Role { get; set; }
	public bool IsBanned { get; set; }

	/* 1-M Relationships */
	public ICollection<Album> Albums { get; }
	public ICollection<Song> Songs { get; }

	/* M-N Relationships */
	public ICollection<Album> CollabAlbums { get; }
	public ICollection<Song> CollabSongs { get; }
	public ICollection<Queue> Queue { get; set; } = [];
}