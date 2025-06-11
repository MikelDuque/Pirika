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

}
