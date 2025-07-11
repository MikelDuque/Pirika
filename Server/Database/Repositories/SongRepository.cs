using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;
using Server.Models.DTOs.Filter;

namespace Server.Database.Repositories;

public class SongRepository : Repository<Song>
{
  public SongRepository(DataContext dataContext) : base(dataContext) { }

  public async Task<Song> GetIncludesByIdAsync(long id)
  {
    return await GetQueryable()
      .Where(song => song.Id == id)
      .Include(song => song.Author)
      .Include(song => song.Collaborations)
      .Include(song => song.Genres)
      .FirstOrDefaultAsync();
  }

  public async Task<IEnumerable<Song>> GetFilteredSongs(Filter filter)
	{
    IEnumerable<Song> songList = await GetAllAsync();

		return TextHelper.SearchFilter<Song>(songList, filter.Search, song => song.Title);
	}
}