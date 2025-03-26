using Microsoft.AspNetCore.Authentication;

namespace Server.Websocket
{
	public class WebSocketMiddleware
	{
		private readonly RequestDelegate _next;

		public WebSocketMiddleware(RequestDelegate next)
		{
			_next = next;
		}

		public Task Invoke(HttpContext httpContext)
		{
			if (httpContext.WebSockets.IsWebSocketRequest)
			{
				string token = httpContext.Request.Query["accessToken"];

				if (!string.IsNullOrEmpty(token))
				{
					httpContext.Request.Headers.Authorization = "Bearer " + token;
				}
				else
				{
					Task.FromResult(AuthenticateResult.Fail("Invalid Credentials"));
				}
			}

			return _next(httpContext);
		}
	}

	public static class WebSocketMiddlewareExtensions
	{
		public static IApplicationBuilder UseWebSocketMiddleware(this IApplicationBuilder builder)
		{
			return builder.UseMiddleware<WebSocketMiddleware>();
		}
	}
}
