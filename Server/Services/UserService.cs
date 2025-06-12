using Server.Database;
using Server.Database.Entities;
using Server.Models.DTOs.Follows;
using Server.Models.DTOs.User;
using Server.Models.Mappers;

namespace Server.Services;

public class UserService
{
	private readonly UnitOfWork _unitOfWork;
	private readonly ArtistMapper _artistMapper;
	private readonly BasicElementMapper _elementMapper;

	public UserService(UnitOfWork unitOfWork, ArtistMapper artistMapper, BasicElementMapper elementMapper)
	{
		_unitOfWork = unitOfWork;
		_artistMapper = artistMapper;
		_elementMapper = elementMapper;
	}

	/* GET */
	public async Task<Artist> GetUser(long userId)
	{
		User user = await _unitOfWork.UserRepository.GetWithIncludesByIdAsync(userId);

		return _artistMapper.ToArtist(user);
	}

	public async Task<FollowData> GetFollowData(long userId)
	{
		IEnumerable<User> followers = await _unitOfWork.UserRepository.GetFollowersById(userId);
		IEnumerable<User> following = await _unitOfWork.UserRepository.GetFollowersById(userId);

		return new FollowData
		{
			Followers = _elementMapper.ToDto(followers),
			Following = _elementMapper.ToDto(following)
		};
	}
}
