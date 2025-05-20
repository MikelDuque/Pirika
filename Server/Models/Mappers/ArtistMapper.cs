using Server.Database.Entities;
using Server.Models.DTOs.User;

namespace Server.Models.Mappers;

public class ArtistMapper
{
  //To Dto
  public Artist ToDto(User artist)
  {
    return new Artist
    {
      Id = artist.Id,
      Name = artist.DisplayName,
      Avatar = artist.Avatar
    };
  }

  public IEnumerable<Artist> ToDto(IEnumerable<User> artists)
  {
    return artists.Select(ToDto);
  }
}
