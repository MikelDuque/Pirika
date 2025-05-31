using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

[PrimaryKey(nameof(CollectionId), nameof(SongId))]
public class CollectionSong
{
	public required long CollectionId { get; set; }
	public required long SongId { get; set; }
}