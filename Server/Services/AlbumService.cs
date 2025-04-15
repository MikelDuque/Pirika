using Server.Database;
using Server.Models.DTOs;

namespace Server.Services;

public class AlbumService
{
  private readonly UnitOfWork _unitOfWork;

	public AlbumService(UnitOfWork unitOfWork)
	{
		_unitOfWork = unitOfWork;
	}

	public bool Publish(NewAlbum newAlbum)
	{
		return true;
	}
}
