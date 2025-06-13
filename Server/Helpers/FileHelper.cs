namespace Server.Helpers;

public class FileHelper
{
	public static async Task<string> SaveAvatar(IFormFile image, string username)
	{
		if (image == null)
		{
			int rNumber = Random.Shared.Next(1, 3);
			return $"ProfilePictures/DefaultAvatar{rNumber}.png";
		}

		return await SaveFile(image, username, "ProfilePictures");
	}

	public static async Task<string> SaveCover(IFormFile cover, long collectionId, long authorId)
	{
		string coverPath = $"Covers/{authorId}";

		return await SaveFile(cover, collectionId.ToString(), coverPath);
	}

	public static async Task<string> SaveSong(IFormFile song, long songId, long collectionId, long authorId)
	{
		string songPath = $"Music/{authorId}/{collectionId}";

		return await SaveFile(song, songId.ToString(), songPath);
	}

	private static async Task<string> SaveFile(IFormFile file, string name, string path)
	{
		string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
		string fileName = name.ToLowerInvariant() + fileExtension;

		string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path, fileName);

		using (var stream = new FileStream(filePath, FileMode.Create))
		{
			await file.CopyToAsync(stream);
		}

		return $"{path}/{fileName}";
	}
}
