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

	[HttpGet("Get_Songs")]
	public ActionResult GetAllSongs()
	{
		try
		{
			return Ok(_songService.GetAllSongs());
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpPost("Publish")]	//No se si al final la emplearé, lo dudo.
	public ActionResult Publish([FromForm] NewSong newSong)
	{
		if (newSong == null) return BadRequest(new { Message = "Album data is missing" });

		try
		{
			return Ok();	//De momento no tiene logica, se hace todo a través de las colecciones
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}
}
