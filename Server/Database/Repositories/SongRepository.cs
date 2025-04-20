using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class SongRepository : Repository<Song>
{
  public SongRepository(DataContext dataContext) : base(dataContext) { }

  public new async Task<IEnumerable<Song>> GetAllAsync()
  {
    return await GetQueryable()
      .Include(song => song.Author)
      .Include(song => song.Collaborators)
      .ToListAsync();
  }

  public async Task<IEnumerable<Song>> InsertAsync(IEnumerable<Song> songs)
  {
		return await Task.WhenAll(songs.Select(InsertAsync));
	}
}