using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

[PrimaryKey(nameof(AlbumId), nameof(GenreId))]
public class AlbumGenre
{
  [ForeignKey(nameof(Album))]
  public required long AlbumId { get; set; }
  public Album Album { get; set; }

  [ForeignKey(nameof(Genre))]
  public required long GenreId { get; set; }
  public Genre Genre { get; set; }
}
