namespace Server.Websocket;

public class MyWebSocketMiddleware: IMiddleware
{
	public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next)
	{
		if (httpContext.WebSockets.IsWebSocketRequest)
		{
			string token = httpContext.Request.Query["accessToken"];

			if (!string.IsNullOrEmpty(token) && !httpContext.Request.Headers.ContainsKey("Authorization"))
			{
				httpContext.Request.Headers["Authorization"] = "Bearer " + token;
			}
		}

		await next(httpContext);
	}
}
