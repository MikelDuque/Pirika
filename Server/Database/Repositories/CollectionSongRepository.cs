using Server.Database.Entities;
using Server.Database.Entities.Relationships;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class CollectionSongRepository : Repository<CollectionSong>
{
	public CollectionSongRepository(DataContext dataContext) : base(dataContext) { }

	public async Task<IEnumerable<CollectionSong>> InsertAsync(IEnumerable<Song> songs, long collectionId)
	{
		IEnumerable<CollectionSong> relationShips = [];
		foreach (Song song in songs)
		{
			CollectionSong newRelationship = new CollectionSong
			{
				SongId = song.Id,
				CollectionId = collectionId,
			};

			relationShips.Append(newRelationship);
		}

		return await Task.WhenAll(relationShips.Select(InsertAsync));
	}
}