using System.Xml;
using Microsoft.OpenApi.Extensions;
using Server.Models.DTOs;
using Server.Models.DTOs.Song;
using Server.Models.Enums;

namespace Server.Helpers;

public class FileHelper
{
	public static async Task<string> SaveAvatar(IFormFile image, string username)
	{
		if (image == null)
		{
			int rNumber = Random.Shared.Next(1, 3);
			return $"/ProfilePictures/DefaultAvatar{rNumber}.png";
		}

		return await SaveFile(image, username, "ProfilePictures");
	}

	public static async Task<IEnumerable<string>> SaveSong(IFormFile song, IFormFile cover, int songId, int authorId)
	{
		string songPath = $"Music/{authorId}";
		string coverPath = $"Covers/{authorId}";

		return
		[
			await SaveFile(cover, $"S_{songId}", coverPath),
			await SaveFile(song, songId.ToString(), songPath)
		];
	}

	// public async IEnumerable<string> SaveAlbum(NewAlbum album, int albumId)
	// {
	// 	string coverPath = $"Covers/{album.AuthorId}";

	// 	IEnumerable<string> paths = [await SaveFile(album.Cover, $"A_{albumId}", coverPath)];
		
	// 	foreach (IFormFile song in album.Songs)
	// 	{
	// 		string songPath = $"Music/{album.AuthorId}";
	// 		await SaveFile(song, songId.ToString(), songPath)
	// 	}
	// }

	private static async Task<string> SaveFile(IFormFile file, string name, string path )
	{
		string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
		string fileName = name.ToLowerInvariant() + fileExtension;

		string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path, fileName);

		using (var stream = new FileStream(filePath, FileMode.Create))
		{
			await file.CopyToAsync(stream);
		}

		return $"/{path}/{fileName}";
	}
}
