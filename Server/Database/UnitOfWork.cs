using Server.Database.Repositories;

namespace Server.Database;

public class UnitOfWork
{
	private readonly DataContext _dataContext;

	/* GENRE */
	private GenreRepository _genreRepository = null!;
	public GenreRepository GenreRepository => _genreRepository ??= new GenreRepository(_dataContext);

	/* USER */
	private UserRepository _userRepository = null!;
	public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);

	/* MUSIC */
	private MusicRepository _musicRepository = null!;
	public MusicRepository MusicRepository => _musicRepository ??= new MusicRepository(_dataContext);

	/* SONG */
	private SongRepository _songRepository = null!;
	public SongRepository SongRepository => _songRepository ??= new SongRepository(_dataContext);

	/* COLLECTION */
	private CollectionRepository _collectionRepository = null!;
	public CollectionRepository CollectionRepository => _collectionRepository ??= new CollectionRepository(_dataContext);

	/* FOLLOW */
	private FollowRepository _followRepository = null!;
	public FollowRepository FollowRepository => _followRepository ??= new FollowRepository(_dataContext);

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
