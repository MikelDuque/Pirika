using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTOs;
using Server.Models.DTOs.Filter;
using Server.Services;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class MusicController : Controller
{
	private readonly MusicService _musicService;

	public MusicController(MusicService musicService)
	{
		_musicService = musicService;
	}

	[HttpGet("Get_Collection/{id}")]
	public async Task<ActionResult> GetCollection(long id)
	{
		try
		{
			return Ok(await _musicService.GetCollection(id));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpGet("Get_Song/{id}")]
	public async Task<ActionResult> GetSong(long id)
	{
		try
		{
			return Ok(await _musicService.GetSong(id));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpPost("Search")]
	public ActionResult SearchMusic([FromBody] Filter filter)
	{
		try
		{
			return Ok(_musicService.SearchMusic(filter));
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpPost("Publish")]
  public async Task<ActionResult> Publish([FromForm] NewCollection newAlbum)
  {
    if (newAlbum == null) return BadRequest(new { Message = "Album data is missing" });

    try
    {
      return Ok(await _musicService.Publish(newAlbum));
    }
    catch (Exception error)
    {
      return BadRequest(new { Message = error.ToString() });
    }
  }
}