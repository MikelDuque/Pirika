namespace Server.Helpers;

public class FileHelper
{
	public static async Task<string> SaveAvatar(IFormFile image, string username)
	{
		if (image == null)
		{
			int rNumber = Random.Shared.Next(1, 3);
			return $"ProfilePictures/DefaultAvatar{rNumber}.jpg";
		}

		return await SaveFile(image, username, "ProfilePictures");
	}

	public static async Task<string> SaveCover(IFormFile cover, long collectionId, long authorId)
	{
		string coverPath = $"Music/{authorId}/{collectionId}";
		string path = Path.Combine("Music", authorId.ToString(), collectionId.ToString());

		return await SaveFile(cover, "cover", path);
	}

	public static async Task<string> SaveSong(IFormFile song, long songId, long collectionId, long authorId)
	{
		string songPath = $"Music/{authorId}/{collectionId}";
		string path = Path.Combine("Music", authorId.ToString(), collectionId.ToString());

		return await SaveFile(song, songId.ToString(), path);
	}

	private static async Task<string> SaveFile(IFormFile file, string name, string path)
	{
		string fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
		string fileName = name + fileExtension;

		string directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", path);
		DirectoryInfo newDirectory = Directory.CreateDirectory(directoryPath);

		string filePath = Path.Combine(newDirectory.FullName, fileName);

		using (var stream = new FileStream(filePath, FileMode.Create))
		{
			await file.CopyToAsync(stream);
		}

		return $"{path}/{fileName}";
	}
}
