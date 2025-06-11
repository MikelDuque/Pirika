using Server.Database.Entities.Relationships;

namespace Server.Models.Mappers;

public class CollaborationMapper
{
	//GenreEnum To Genre Entity
	public Collaboration ToEntity(long userId, long musicId)
	{
		return new Collaboration
		{
			UserId = userId,
			MusicId = musicId,
		};
	}

	public IEnumerable<Collaboration> ToEntity(IEnumerable<long> userIds, long songId)
	{
		return userIds.Select(userId => ToEntity(userId, songId));
	}
}