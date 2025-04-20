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

	public async Task<IEnumerable<Song>> SongsPublished(IEnumerable<Song> songs, long userId)
	{
		return await GetQueryable()
			.Where(user => user.Id == userId)
			.SelectMany(user => user.Songs)
			.Where(song => songs.Any(newSong => newSong.Id == song.Id || newSong.Title == song.Title))
			.ToListAsync();
	}
}