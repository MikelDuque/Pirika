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
	public IEnumerable<User> Followers { get; }
	public IEnumerable<User> Following { get; }

	public IEnumerable<Music> OwnMusic { get; }

	public ICollection<Collaboration> Collaborations { get; set; }
}