namespace Server.Models.DTOs.User;

public class Artist
{
  public long Id { get; set; }
  public string Name { get; set; }
  public string Avatar { get; set; }
  public int Followers { get; set; }
  public int Following { get; set; }
  public IEnumerable<BasicElement> Music { get; set; }
}
