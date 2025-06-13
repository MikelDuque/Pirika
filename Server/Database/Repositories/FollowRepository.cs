using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class FollowRepository : Repository<Follow>
{
	public FollowRepository(DataContext dataContext) : base(dataContext) { }

	public async Task<Follow> GetRelationshipAsync(long userAId, long userBId)
	{
		return await GetQueryable()
			.Where(follow => follow.UserAId == userAId && follow.UserBId == userBId)
			.FirstOrDefaultAsync();
	}

	public async Task<Follow> GetInverseRelationshipAsync(long userAId, long userBId)
	{
		return await GetQueryable()
			.Where(follow => follow.UserAId == userBId && follow.UserBId == userAId)
			.FirstOrDefaultAsync();
	}
}
