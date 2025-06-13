using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTOs.Follows;
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

	[HttpPost("Follow_Artist")]
	public async Task<ActionResult> FollowArtist(Request followRequest)
	{
		try
		{
			return Ok(await _userService.FollowUser(followRequest));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpPost("Get_Artists_By_Name")]
	public async Task<ActionResult> GetArtistByName(string artistName)
	{
		try
		{
			return Ok(await _userService.GetArtistsByName(artistName));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}
}
