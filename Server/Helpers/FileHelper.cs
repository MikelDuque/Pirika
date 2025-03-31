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

		string fileExtension = Path.GetExtension(image.FileName).ToLowerInvariant();
		string fileName = username.ToLowerInvariant() + fileExtension;

		string filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "ProfilePictures", fileName);

		using (var stream = new FileStream(filePath, FileMode.Create))
		{
			await image.CopyToAsync(stream);
		}

		return $"/ProfilePictures/{fileName}";
	}
}
