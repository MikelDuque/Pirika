using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;
using Server.Models.DTOs.Filter;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

  public async Task<IEnumerable<Song>> GetFilteredSongs(Filter filter)
	{
		TextHelper _textHelper = new();

    IEnumerable<Song> songList = await GetAllAsync();

		return _textHelper.SearchFilter<Song>(songList, filter.Search, song => song.Title);
	}

  public async Task<IEnumerable<Song>> InsertAsync(IEnumerable<Song> songs)
  {
		return await Task.WhenAll(songs.Select(InsertAsync));
	}
}