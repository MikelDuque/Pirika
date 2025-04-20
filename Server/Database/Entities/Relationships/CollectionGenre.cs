using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Server.Database.Entities.Relationships;

[PrimaryKey(nameof(CollectionId), nameof(GenreId))]
public class CollectionGenre
{
	public required long CollectionId { get; set; }

	[ForeignKey(nameof(Genre))]
	public required long GenreId { get; set; }
	public Genre Genre { get; set; }
}
