using eCommerce.Services;
using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;
using Server.Database.Repositories.Common;
using Server.Models.DTOs.Filter;
using Server.Models.Enums;

namespace Server.Database.Repositories;

public class MusicRepository : Repository<Music>
{
	public MusicRepository(DataContext dataContext) : base(dataContext) { }

	public async Task<Music> GetIncludesByIdAsync(long id)
	{
		return await GetQueryable()
			.Where(music => music.Id == id)
			.Include(music => music.Author)
			.Include(music => music.Collaborations)
			.Include(music => music.Genres)
			.FirstOrDefaultAsync();
	}

	public IEnumerable<Music> ApplyFilter(Filter filter, IEnumerable<ElementType> types)
	{
		IQueryable<Music> musicQuery = GetQueryable()
			.Where(music => !filter.Genres.Any() || music.Genres
				.Any(genre => filter.Genres
					.Contains((byte)genre.Id)))
			.Include(music => music.Author)
			.Include(music => music.Collaborations);

		return (types.Contains(ElementType.Song), types.Contains(ElementType.Collection)) switch
		{
			(true, false) => musicQuery.OfType<Song>(),
			(false, true) => musicQuery.OfType<Collection>(),
			(false, false) => musicQuery.Where(_ => false),
			_ => musicQuery
		};
	}
}
