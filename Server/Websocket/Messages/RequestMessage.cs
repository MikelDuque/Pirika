using Server.Models.DTOs.Follows;
using Server.Websocket.Messages.Common;

namespace Server.Websocket.Messages;

public class RequestMessage : IMessage<Request>
{
	public string Header => "FollowRequest";
	public Request Body { get; set; }

	public RequestMessage(Request body)
	{
		Body = body;
	}
}
