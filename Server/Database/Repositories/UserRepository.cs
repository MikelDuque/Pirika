using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class UserRepository : Repository<User>
{
	public UserRepository(DataContext dataContext) : base(dataContext) { }

	public async Task<User> GetByMailOrUsername(string identifier)
	{
		return await GetQueryable()
			.Where(user => identifier.Contains('@') ? user.Mail == identifier.ToLowerInvariant() : user.Username == identifier)
			.SingleOrDefaultAsync();
	}

	public async Task<IEnumerable<User>> GetByDisplayName(string name)
	{
		return await GetQueryable()
			.Where(user => user.DisplayName == name)
			.ToListAsync();
	}

	public async Task<User> GetWithIncludesByIdAsync(long id)
	{
		return await GetQueryable().Where(user => user.Id == id)
			.Include(user => user.OwnMusic)
				.ThenInclude(collection => collection.Genres)
			.Include(user => user.OwnMusic)
				.ThenInclude(collection => collection.Collaborations)
				.ThenInclude(collab => collab.User)
			.Include(user => user.Followers)
			.Include(user => user.Following)
			.FirstOrDefaultAsync();
	}

	public async Task<IEnumerable<User>> GetFollowersById(long id)
	{
		User thisUser = await GetWithIncludesByIdAsync(id);
		return thisUser.Followers;
	}
	//public async Task<IEnumerable<User>> GetFollowingById(long id)
	//{
	//	User thisUser = await GetByIdAsync(id);
	//	return thisUser.Following;
	//}
}