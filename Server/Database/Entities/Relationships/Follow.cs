using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

//[Table("UserUser")]
[PrimaryKey(nameof(FollowerId), nameof(FollowingId))]
public class Follow
{
	public DateTime? FriendshipStart { get; set; }

	/* RELACIÓN N:M */
	[ForeignKey(nameof(Follower))]
	public required long FollowerId { get; set; }
	public User Follower { get; set; }

	[ForeignKey(nameof(Following))]
	public required long FollowingId { get; set; }
	public User Following { get; set; }
}
