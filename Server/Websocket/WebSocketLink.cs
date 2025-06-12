using System.Data;
using System.Net.WebSockets;
using System.Text;
using Server.Helpers;
using Server.Websocket.Messages.Common;

namespace Server.Websocket;

public class WebSocketLink: IDisposable
{
	private const int BUFFER_SIZE = 4096;
	private readonly byte[] _buffer;
	private readonly WebSocket _webSocket;

	public long Id { get; init; }
	public bool IsOpen => _webSocket.State == WebSocketState.Open;
	public ConnectionState ConnectionState { get; set; }

	//EVENTOS
	public event Func<WebSocketLink, Task> Disconnected;
	public event Func<WebSocketLink, string, Task> MusicRelease;

	public WebSocketLink(long id, WebSocket webSocket)
	{
		_buffer = new byte[BUFFER_SIZE];
		_webSocket = webSocket;

		Id = id;
		ConnectionState = IsOpen ? ConnectionState.Open : ConnectionState.Closed;
	}

	public async Task HandleEventAsync()
	{
		while (IsOpen)
		{
			string message = await ReadAsync();

			if (!string.IsNullOrWhiteSpace(message)) await InvokeEvents(message);
			else throw new Exception("El mensaje enviado está vacío");
		}

		if (Disconnected != null)
		{
			ConnectionState = ConnectionState.Closed;
			await Disconnected.Invoke(this);
		}
	}

	public void Dispose()
	{
		ConnectionState = ConnectionState.Closed;
		_webSocket.Dispose();
	}

	//FUNCIONES PRIVADAS
	private async Task<string> ReadAsync()
	{
		using MemoryStream stream = new();
		WebSocketReceiveResult receiveResult;

		do
		{
			receiveResult = await _webSocket.ReceiveAsync(_buffer, CancellationToken.None);

			if (receiveResult.MessageType == WebSocketMessageType.Text)
			{
				stream.Write(_buffer, 0, receiveResult.Count);
			}
			else if (receiveResult.CloseStatus.HasValue)
			{
				await _webSocket.CloseAsync(receiveResult.CloseStatus.Value, receiveResult.CloseStatusDescription, CancellationToken.None);
				return string.Empty;
			}
		}
		while (!receiveResult.EndOfMessage);

		return Encoding.UTF8.GetString(stream.ToArray());
	}

	private async Task InvokeEvents(string message)
	{
		string type = GetMessageType(message);

		switch (type)
		{
			case "MusicRelease":
				if (MusicRelease != null) await MusicRelease.Invoke(this, message);
				break;
			case "":
				throw new Exception("No existen eventos con esa cabecera");
		}
	}

	private string GetMessageType(string jsonString)
	{
		IMessage<object> message = MessageParseHelper.DesGenericMessage<object>(jsonString);
		return message.Header;
	}
}
