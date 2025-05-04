using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTOs;
using Server.Services;

namespace Server.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CollectionController : Controller
{
	private readonly CollectionService _collectionService;

	public CollectionController(CollectionService collectionService)
	{
		_collectionService = collectionService;
	}

	[HttpGet("Get_Collections")]
	public ActionResult GetAllCollections()
	{
		try
		{
			return Ok(_collectionService.GetAllCollections());
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpGet("Get_Collection/{id}")]
	public ActionResult GetCollection(long id)
	{
		try
		{
			return Ok(_collectionService.GetCollection(id));
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
			return Ok(_collectionService.SearchMusic());
		}
		catch (Exception error)
		{
			return BadRequest(new { Message = error.ToString() });
		}
	}

	[HttpPost("Publish")]
  public ActionResult Publish([FromForm] NewCollection newAlbum)
  {
    if (newAlbum == null) return BadRequest(new { Message = "Album data is missing" });

    try
    {
      return Ok(_collectionService.Publish(newAlbum));
    }
    catch (Exception error)
    {
      return BadRequest(new { Message = error.ToString() });
    }
  }
}