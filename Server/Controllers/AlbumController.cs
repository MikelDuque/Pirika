using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTOs;
using Server.Services;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AlbumController : Controller
{
  private readonly AlbumService _albumService;

	public AlbumController(AlbumService albumService)
	{
		_albumService = albumService;
	}

  [HttpPost("Publish")]
  public ActionResult Publish([FromForm] NewAlbum newAlbum)
  {
    if (newAlbum == null) return BadRequest(new { Message = "Album data is missing" });

    try
    {
      return Ok(_albumService.Publish(newAlbum));
    }
    catch (Exception error)
    {
      return BadRequest(new { Message = error.ToString() });
    }
  }
}