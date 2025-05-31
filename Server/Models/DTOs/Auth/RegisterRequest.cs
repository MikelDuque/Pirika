namespace Server.Models.DTOs.Auth;

public class RegisterRequest
{
	public string DisplayName { get; set; }
	public required string Username { get; set; }
	public required string Mail { get; set; }
	public required string Password { get; set; }
	public IFormFile Avatar { get; set; }
}