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

	public async Task<User> GetWithIncludesByIdAsync(long id)
	{
		return await GetQueryable().Where(user => user.Id == id)
			.Include(user => user.OwnMusic.Where(music => music is Collection))
			.Include(user => user.Followers)
			.Include(user => user.Following)
			.FirstOrDefaultAsync();
	}

	public async Task<IEnumerable<User>> GetFollowersById(long id)
	{
		User thisUser = await GetByIdAsync(id);
		return thisUser.Followers;
	}
	public async Task<IEnumerable<User>> GetFollowingById(long id)
	{
		User thisUser = await GetByIdAsync(id);
		return thisUser.Following;
	}

	//public async Task<IEnumerable<User>> GetFilteredSongs(Filter filter)
	//{
	//	IEnumerable<User> userList = await GetAllAsync();

	//	return TextHelper.SearchFilter<User>(userList, filter.Search, user => user.DisplayName);
	//}

	//public async Task<IEnumerable<User>> SongsPublished(IEnumerable<Song> songs, long userId)
	//{
	//	List<long> songIds = songs.Select(s => s.Id).ToList();
	//	List<string> songTitles = songs.Select(s => s.Title).ToList();

	//	return await GetQueryable()
	//		.Where(user => user.Id == userId && user.OwnMusic.Any(song =>
	//					songIds.Contains(song.Id) || songTitles.Contains(song.Title)))
	//		.ToListAsync();
	//}
}