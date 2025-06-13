using Server.Database;
using Server.Database.Entities;
using Server.Models.DTOs.MessageBody;

namespace Server.Websocket.Systems;

public class MusicSystem
{
	private readonly IServiceScopeFactory _scopeFactory;
	private readonly HashSet<WebSocketLink> _connections;

	public MusicSystem(IServiceScopeFactory scopeFactory, HashSet<WebSocketLink> connections)
	{
		_scopeFactory = scopeFactory;
		_connections = connections;
	}

	public async Task OnRelease(WebSocketLink thisUser, string releaseMessage)
	{
		List<Task> tasks = [];
		WebSocketLink[] connections = _connections.ToArray();

		IEnumerable<long> followersId = await GetFollowers(thisUser.Id);

		foreach (WebSocketLink connectedUser in connections)
		{
			if(followersId.Any(followerId => followerId == connectedUser.Id))
			{
				tasks.Add(connectedUser.SendAsync(releaseMessage));
			}
		}

		await Task.WhenAll(tasks);
	}

	private async Task<IEnumerable<long>> GetFollowers(long thisUserId)
	{
		using IServiceScope serviceScope = _scopeFactory.CreateScope();
		UnitOfWork unitOfWork = serviceScope.ServiceProvider.GetService<UnitOfWork>();

		IEnumerable<User> followers = await unitOfWork.UserRepository.GetFollowersById(thisUserId);

		return followers.Select(user => user.Id);
	}

}
