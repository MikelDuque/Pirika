namespace Server.Websocket.Messages.Common;

public interface IMessage<TBody> where TBody : class
{
	string Header { get; }
	TBody Body { get; set; }
}
