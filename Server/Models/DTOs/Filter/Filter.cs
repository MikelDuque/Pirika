namespace Server.Models.DTOs.Filter;

public class Filter
{
	public string Search { get; set; }
	public List<byte> Genres { get; set; }
	public List<byte> Types { get; set; }
	public byte Order { get; set; }
	public int ItemsPerPage { get; set; }
	public int CurrentPage { get; set; }
}