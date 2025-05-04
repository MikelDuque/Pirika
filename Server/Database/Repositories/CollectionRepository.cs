using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;

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