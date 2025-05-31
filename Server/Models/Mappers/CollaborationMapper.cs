using Server.Database.Entities.Relationships;

namespace Server.Models.Mappers;

public class CollaborationMapper
{
	//GenreEnum To Genre Entity
	public Collaboration ToEntity(long userId, long songId)
	{
		return new Collaboration
		{
			UserId = userId,
			SongId = songId,
		};
	}

	public IEnumerable<Collaboration> ToEntity(IEnumerable<long> userIds, long songId)
	{
		return userIds.Select(userId => ToEntity(userId, songId));
	}
}