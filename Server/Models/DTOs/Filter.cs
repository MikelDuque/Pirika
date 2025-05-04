namespace Server.Models.DTOs;

public class Filter
{
	public string Search { get; set; }
	public byte Genre { get; set; }
	public byte Type { get; set; }
	public int ItemsPerPage { get; set; }
	public int CurrentPage { get; set; }
}