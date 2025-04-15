using Server.Database;
using Server.Models.DTOs.Song;

namespace Server.Services;

public class SongService
{
	private readonly UnitOfWork _unitOfWork;

	public SongService(UnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public bool Publish(NewSong newSong)
	{
		return true;
	}
}
