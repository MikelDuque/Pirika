using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

[PrimaryKey(nameof(UserId), nameof(SongId))]
public class Collaboration
{
	[ForeignKey(nameof(User))]
	public required long UserId { get; set; }
	public User User { get; set; }

	[ForeignKey(nameof(Song))]
	public required long SongId { get; set; }
	public Song Song { get; set; }
}