using Server.Database;

namespace Server.Services;

public class SongService
{
	private readonly UnitOfWork _unitOfWork;

	public SongService(UnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}
}
