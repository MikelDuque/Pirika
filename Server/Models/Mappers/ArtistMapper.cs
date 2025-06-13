using Server.Database.Entities;
using Server.Models.DTOs;

namespace Server.Models.Mappers;

public class ArtistMapper
{
	BasicElementMapper _elementMapper;

  public ArtistMapper(BasicElementMapper elementMapper)
  {
		_elementMapper = elementMapper;
  }

  //To Artist
  public Artist ToArtist(User artist)
  {
    return new Artist
    {
      Id = artist.Id,
      Name = artist.DisplayName,
      Avatar = artist.Avatar,
      Followers = artist.Followers.Count(),
      Following = artist.Following.Count(),
      Music = _elementMapper.ToDto(artist.OwnMusic.OfType<Collection>())
    };
  }

  public IEnumerable<Artist> ToArtist(IEnumerable<User> artists)
  {
    return artists.Select(ToArtist);
  }


  //To Author
  //public Author ToAuthor(User author)
  //{
  //	return new Artist
  //	{
  //		Id = author.Id,
  //		Name = author.DisplayName,
  //		Avatar = author.Avatar
  //	};
  //}

  //public IEnumerable<Author> ToAuthor(IEnumerable<User> authors)
  //{
  //	return authors.Select(ToAuthor);
  //}
}
