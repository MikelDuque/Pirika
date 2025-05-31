using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

using Server.Services;
using Server.Models.DTOs.Auth;

namespace Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthController : ControllerBase
	{
		private readonly AuthService _authService;

		public AuthController(IOptionsMonitor<JwtBearerOptions> jwtOptions, AuthService authService)
		{
			_authService = authService;
		}

		[HttpPost("Login")]
		public async Task<ActionResult> Login([FromBody] LoginRequest model)
		{
			if (model == null) return BadRequest(new { Message = "Los datos de usuario son inválidos." });

			try
			{
				string stringToken = await _authService.ProceedWithLogin(model);
				return Ok(new LoginResult { AccessToken = stringToken });
			}
			catch (UnauthorizedAccessException errorAuth)
			{
				return Unauthorized(new { Message = errorAuth.Message.ToString() });
			}
		}

		[HttpPost("Register")]
		public async Task<ActionResult> Register([FromForm] RegisterRequest userRequest)
		{
			if (userRequest == null) return BadRequest(new { Message = "Los datos de usuario son inválidos." });

			try
			{
				string stringToken = await _authService.Register(userRequest);
				return Ok(new LoginResult { AccessToken = stringToken });
			}
			catch (Exception error)
			{
				return BadRequest(new { Message = error.ToString() });
			}

		}
	}
}
