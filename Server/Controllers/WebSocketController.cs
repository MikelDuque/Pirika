using System.Net.WebSockets;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Websocket;

namespace Server.Controllers
{
	[Route("Websocket")]
	[ApiController]
	[Authorize]
	public class WebSocketController : ControllerBase
	{
		private readonly WebSocketNetwork _websocketNetwork;

		public WebSocketController(WebSocketNetwork webSocketNetwork)
		{
			_websocketNetwork = webSocketNetwork;
		}

		[HttpGet]
		public async Task ConnectAsync()
		{
			WebSocket webSocket = await HttpContext.WebSockets.AcceptWebSocketAsync();
			long userId = long.Parse(User.FindFirstValue("id"));

			//await _websocketNetwork.HandleAsync(webSocket, userId);
		}
	}
}
