using System.Net.WebSockets;
using Server.Helpers;
using Server.Models.DTOs.MessageBody;
using Server.Websocket.Messages;
using Server.Websocket.Systems;

namespace Server.Websocket;

public class WebSocketNetwork
{
	private readonly HashSet<WebSocketLink> _connections = new HashSet<WebSocketLink>();
	private readonly SemaphoreSlim _semaphore = new(1, 1);

	//SYSTEMS
	private readonly MusicSystem _musicSystem;

	public WebSocketNetwork(IServiceScopeFactory scopeFactory)
	{
		_musicSystem = new MusicSystem(scopeFactory, _connections);
	}

	public async Task HandleAsync(WebSocket webSocket, long userId)
	{
		WebSocketLink connection = await AddWebsocketAsync(webSocket, userId);

		await connection.HandleEventAsync();
	}

	//WS FUNCTIONS
	private async Task<WebSocketLink> AddWebsocketAsync(WebSocket webSocket, long userId)
	{
		await _semaphore.WaitAsync();

		try
		{
			WebSocketLink newConnection = new(userId, webSocket);
			newConnection.Disconnected += OnDisconnectedAsync;
			newConnection.MusicRelease += OnMusicReleaseAsync;

			_connections.Add(newConnection);
			return newConnection;
		}
		finally
		{
			_semaphore.Release();
		}
	}

	private async Task OnDisconnectedAsync(WebSocketLink disconnectedUser)
	{
		await _semaphore.WaitAsync();

		try
		{
			disconnectedUser.MusicRelease -= OnMusicReleaseAsync;
			disconnectedUser.Disconnected -= OnDisconnectedAsync;
			disconnectedUser.Dispose();

			_connections.Remove(disconnectedUser);
		}
		finally
		{
			_semaphore.Release();
		}
	}

	//WS SYSTEMS
	private async Task OnMusicReleaseAsync(WebSocketLink connectedUser, string message)
	{
		await _semaphore.WaitAsync();

		try
		{
			await _musicSystem.OnRelease(connectedUser, message);
		}
		finally
		{
			_semaphore.Release();
		}
	}
}
