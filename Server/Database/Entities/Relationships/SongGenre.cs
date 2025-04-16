using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

[PrimaryKey(nameof(SongId), nameof(GenreId))]
public class SongGenre
{
  /* RELACIÓN N:M */
  public required long SongId { get; set; }

  [ForeignKey(nameof(Genre))]
  public required long GenreId { get; set; }
  public Genre Genre { get; set; }
}
