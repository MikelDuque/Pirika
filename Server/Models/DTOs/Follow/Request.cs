namespace Server.Models.DTOs.Follows;

public class Request
{
	public long SenderId { get; set; }
	public long TargetId { get; set; }
}
