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
}