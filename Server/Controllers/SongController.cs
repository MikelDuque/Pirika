using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
}
