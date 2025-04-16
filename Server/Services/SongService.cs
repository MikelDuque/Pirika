using Server.Database;
using Server.Database.Entities;
using Server.Models.DTOs.Song;
using Server.Models.Mappers;

namespace Server.Services;

public class SongService
{
	private readonly UnitOfWork _unitOfWork;
	private readonly SongMapper _songMapper;

	public SongService(UnitOfWork unitOfWork, SongMapper songMapper)
	{
		_unitOfWork = unitOfWork;
		_songMapper = songMapper;
	}

	public async Task<SongDto> GetSong(long songId)
	{
		Song song = await _unitOfWork.SongRepository.GetByIdAsync(songId);

		return _songMapper.ToDto(song);
	}

	public bool Publish(NewSong newSong)
	{
		Song thisSong = _songMapper.ToEntity(newSong);

		//Falta meter el array de generos y de usuarios colaboradores
		return true;
	}
}
