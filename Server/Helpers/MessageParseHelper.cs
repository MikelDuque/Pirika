using Server.Websocket.Messages.Common;
using System.Text.Json;

namespace Server.Helpers;

public class MessageParseHelper
{
	public static JsonSerializerOptions Options => new()
	{
		PropertyNamingPolicy = JsonNamingPolicy.CamelCase
	};

	public static JsonSerializerOptions OtherOptions => new()
	{
		PropertyNameCaseInsensitive = true
	};

	public static string GenericMessage<T>(string type, T body) where T : class
	{
		IMessage<T> message = new Message<T>()
		{
			Header = type,
			Body = body
		};

		return JsonSerializer.Serialize(message, Options);
	}

	public static string Message<T>(IMessage<T> message) where T : class
	{
		return JsonSerializer.Serialize(message, Options);
	}

	public static IMessage<T> DesGenericMessage<T>(string jsonObject) where T : class
	{
		return JsonSerializer.Deserialize<Message<T>>(jsonObject, OtherOptions);
	}

	public static T DesMessage<T>(string jsonObject) where T : class
	{
		return JsonSerializer.Deserialize<T>(jsonObject, OtherOptions);
	}

	//public static (int TipoLinea, int Num1, int Num2) ParseMove(string message)
	//{
	//	var data = JsonSerializer.Deserialize<MoveData>(message);
	//	return (data.TipoLinea, data.Num1, data.Num2);
	//}
}
