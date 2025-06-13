using Server.Database;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;
using Server.Models.DTOs;
using Server.Models.DTOs.Follows;
using Server.Models.Mappers;

namespace Server.Services;

public class UserService
{
	private readonly UnitOfWork _unitOfWork;
	private readonly ArtistMapper _artistMapper;
	private readonly FollowMapper _followMapper;

	public UserService(UnitOfWork unitOfWork, ArtistMapper artistMapper, FollowMapper followMapper)
	{
		_unitOfWork = unitOfWork;
		_artistMapper = artistMapper;
		_followMapper = followMapper;
	}

	/* GET */
	public async Task<Artist> GetUser(long userId)
	{
		User user = await _unitOfWork.UserRepository.GetWithIncludesByIdAsync(userId);

		return _artistMapper.ToArtist(user);
	}

	/* POST */
	public async Task<bool> FollowUser(Request followRequest)
	{
		Follow isFollowingMe = await _unitOfWork.FollowRepository.GetInverseRelationshipAsync(followRequest.SenderId, followRequest.TargetId);

		Follow thisFollowEntity = isFollowingMe == null ? _followMapper.ToRegultarRelationship(followRequest) : _followMapper.ToFriendship(followRequest);

		await _unitOfWork.FollowRepository.InsertAsync(thisFollowEntity);
		return await _unitOfWork.SaveAsync();
	}

	public async Task<IEnumerable<Artist>> GetArtistsByName(string name)
	{
		IEnumerable<User> users = await _unitOfWork.UserRepository.GetByDisplayName(name);

		return _artistMapper.ToArtist(users);
	}
}
