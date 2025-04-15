using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities;

[PrimaryKey(nameof(UserId), nameof(SongId))]
public class Queue
{
  public required long Order { get; set; }

  /* RELACIÓN N:M */
  public required long UserId { get; set; }

  [ForeignKey(nameof(Song))]
  public required long SongId { get; set; }
  public Song Song { get; set; }
}
