using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : Controller
{
	private readonly UserService _userService;

	public UserController(UserService userService)
	{
		_userService = userService;
	}

	[HttpGet("Get_User/{id}")]
	public async Task<ActionResult> GetUser(long id)
	{
		try
		{
			return Ok(await _userService.GetUser(id));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpGet("Get_FollowData/{id}")]
	public async Task<ActionResult> GetFollowData(long id)
	{
		try
		{
			return Ok(await _userService.GetFollowData(id));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}
}
