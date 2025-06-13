using Server.Models.DTOs.MessageBody;
using Server.Websocket.Messages.Common;

namespace Server.Websocket.Messages;

public class ReleaseMessage : IMessage<NewRelease>
{
	public string Header => "MusicRelease";
	public NewRelease Body { get; set; }

	public ReleaseMessage(NewRelease body)
	{
		Body = body;
	}
}
