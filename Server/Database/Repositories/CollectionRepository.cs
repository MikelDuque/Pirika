using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;
using Server.Models.DTOs.Filter;

namespace Server.Database.Repositories;

public class CollectionRepository : Repository<Collection>
{
  public CollectionRepository(DataContext dataContext) : base(dataContext) { }

	public new async Task<IEnumerable<Collection>> GetAllAsync()
	{
		return await GetQueryable()
			.Include(collection => collection.Author)
			.Include(collection => collection.Collaborators)
			.Include(collection => collection.Songs)
				.ThenInclude(song => song.Author).Include(song => song.Collaborators)
			.ToListAsync();
	}

	public async Task<IEnumerable<Collection>> GetFilteredSongs(Filter filter)
	{
		TextHelper _textHelper = new();

		IEnumerable<Collection> collectionList = await GetAllAsync();

		return _textHelper.SearchFilter<Collection>(collectionList, filter.Search, collection => collection.Title);
	}

	public async Task<Collection> GetByIdAsync(long id)
	{
		return await GetQueryable()
			.Where(collection => collection.Id == id)
			.Include(collection => collection.Author)
			.Include(collection => collection.Collaborators)
			.Include(collection => collection.Songs)
				.ThenInclude(song => song.Author).Include(song => song.Collaborators)
			.FirstOrDefaultAsync();
	}
}