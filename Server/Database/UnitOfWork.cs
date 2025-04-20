using Server.Database.Repositories;

namespace Server.Database;

public class UnitOfWork
{
	private readonly DataContext _dataContext;

	/* USER */
	private UserRepository _userRepository = null!;
	public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);

	/* GENRE */
	private GenreRepository _genreRepository = null!;
	public GenreRepository GenreRepository => _genreRepository ??= new GenreRepository(_dataContext);

	/* SONG */
	private SongRepository _songRepository = null!;
	public SongRepository SongRepository => _songRepository ??= new SongRepository(_dataContext);

	/* COLLECTION */
	private CollectionRepository _collectionRepository = null!;
	public CollectionRepository CollectionRepository => _collectionRepository ??= new CollectionRepository(_dataContext);

	/* COLLECTIONSONG */
	private CollectionSongRepository _collectionSongRepository = null!;
	public CollectionSongRepository CollectionSongRepository => _collectionSongRepository ??= new CollectionSongRepository(_dataContext);

	/* UNIT OF WORK */
	public UnitOfWork(DataContext dataContext)
	{
		_dataContext = dataContext;
	}

	public async Task<bool> SaveAsync()
	{
		return await _dataContext.SaveChangesAsync() > 0;
	}
}
