using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTOs.Song;
using Server.Services;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class SongController : Controller
{
	private readonly SongService _songService;

	public SongController(SongService songService)
	{
		_songService = songService;
	}

	[HttpPost("Publish")]
	public ActionResult Publish([FromForm] NewSong newSong)
	{
		if (newSong == null) return BadRequest(new { Message = "Album data is missing" });

		try
		{
			return Ok(_songService.Publish(newSong));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}
}
