using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;
using Server.Models.DTOs.Filter;

namespace Server.Database.Repositories;

public class CollectionRepository : Repository<Collection>
{
  public CollectionRepository(DataContext dataContext) : base(dataContext) { }

	public async Task<Collection> GetIncludesByIdAsync(long id)
	{
		return await GetQueryable()
			.Where(collection => collection.Id == id)
			.Include(collection => collection.Author)
			.Include(collection => collection.Collaborations)
			.Include(collection => collection.Genres)
			.Include(collection => collection.Songs)
				.ThenInclude(song => song.Author)
			.Include(collection => collection.Songs)
				.ThenInclude(song => song.Collaborations)
			.Include(collection => collection.Songs)
				.ThenInclude(song => song.Genres)
			.FirstOrDefaultAsync();
	}

	public async Task<IEnumerable<Collection>> GetFilteredSongs(Filter filter)
	{
		IEnumerable<Collection> collectionList = await GetAllAsync();

		return TextHelper.SearchFilter<Collection>(collectionList, filter.Search, collection => collection.Title);
	}
}