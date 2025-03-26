using Server.Database.Repositories;

namespace Server.Database;

public class UnitOfWork
{
	private readonly DataContext _dataContext;

	/* USER */
	private UserRepository _userRepository = null!;
	public UserRepository UserRepository => _userRepository ??= new UserRepository(_dataContext);

	public UnitOfWork(DataContext dataContext)
	{
		_dataContext = dataContext;
	}

	public async Task<bool> SaveAsync()
	{
		return await _dataContext.SaveChangesAsync() > 0;
	}
}
