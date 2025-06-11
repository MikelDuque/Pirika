using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

[PrimaryKey(nameof(UserId), nameof(MusicId))]
public class Collaboration
{
	[ForeignKey(nameof(User))]
	public required long UserId { get; set; }
	public User User { get; set; }

	[ForeignKey(nameof(Music))]
	public required long MusicId { get; set; }
	public Music Music { get; set; }
}