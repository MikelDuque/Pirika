namespace Server.Database.Entities;

public abstract class Item
{
	public long Id { get; set; }
	public string Name { get; set; }
	public string Image { get; set; }
}