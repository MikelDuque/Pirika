using Server.Database;
using Server.Database.Entities;
using Server.Models.DTOs;
using Server.Models.DTOs.Album;
using Server.Models.Mappers;

namespace Server.Services;

public class AlbumService
{
  private readonly UnitOfWork _unitOfWork;
	private readonly AlbumMapper _albumMapper;

	public AlbumService(UnitOfWork unitOfWork, AlbumMapper albumMapper)
	{
		_unitOfWork = unitOfWork;
		_albumMapper = albumMapper;
	}

	public async Task<AlbumDto> GetAlbum(long albumId)
	{
		Album album = await _unitOfWork.AlbumRepository.GetByIdAsync(albumId);

		return _albumMapper.ToDto(album);
	}

	public bool Publish(NewAlbum newAlbum)
	{
		Album thisAlbum = _albumMapper.ToEntity(newAlbum);

		//Falta meter el array de generos y de usuarios colaboradores

		return true;
	}
}