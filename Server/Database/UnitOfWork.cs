using Server.Database.Repositories;

namespace Server.Database;

public class UnitOfWork
{
	private readonly DataContext _dataContext;

	/* USER */
	private UserRepository _userRepository = null!;
	public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);

	/* SONG */
	private SongRepository _songRepository = null!;
	public SongRepository SongRepository => _songRepository ??= new SongRepository(_dataContext);

	/* ALBUM */
	private AlbumRepository _albumRepository = null!;
	public AlbumRepository AlbumRepository => _albumRepository ??= new AlbumRepository(_dataContext);

	/* GENRE */
	private GenreRepository _genreRepository = null!;
	public GenreRepository GenreRepository => _genreRepository ??= new GenreRepository(_dataContext);

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
