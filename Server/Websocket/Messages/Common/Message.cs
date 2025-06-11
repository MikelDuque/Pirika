namespace Server.Websocket.Messages.Common;

public class Message<T> : IMessage<T> where T : class
{
	public string MessageType { get; set; }
	public T Body { get; set; }
}
