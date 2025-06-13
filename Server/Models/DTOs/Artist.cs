using Server.Models.DTOs.Music;

namespace Server.Models.DTOs;

public class Artist
{
  public long Id { get; set; }
  public string Name { get; set; }
  public string Avatar { get; set; }
  public int Followers { get; set; }
  public int Following { get; set; }
  public IEnumerable<BasicElement> Music { get; set; }
}
