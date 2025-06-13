using Server.Database.Entities.Relationships;
using Server.Models.DTOs.Follows;

namespace Server.Models.Mappers;

public class FollowMapper
{
	//To Entity
	public Follow ToRegultarRelationship(Request request)
	{
		return new Follow
		{
			UserAId = request.SenderId,
			UserBId = request.TargetId,
			FriendshipStart = null
		};
	}
	public Follow ToFriendship(Request request)
	{
		return new Follow
		{
			UserAId = request.TargetId,
			UserBId = request.SenderId,
			FriendshipStart = DateTime.UtcNow
		};
	}

	public IEnumerable<Follow> ToRegultarRelationship(IEnumerable<Request> friendRequests)
	{
		return friendRequests.Select(ToRegultarRelationship);
	}

	public IEnumerable<Follow> ToFriendship(IEnumerable<Request> friendRequests)
	{
		return friendRequests.Select(ToFriendship);
	}
}
