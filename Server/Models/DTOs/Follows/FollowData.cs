namespace Server.Models.DTOs.Follows;

public class FollowData
{
	public IEnumerable<BasicElement> Followers { get; set; }
	public IEnumerable<BasicElement> Following { get; set; }
}
