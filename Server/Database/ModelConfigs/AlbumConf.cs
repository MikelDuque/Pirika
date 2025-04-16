using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;

public class AlbumConf : IEntityTypeConfiguration<Collection>
{
  public void Configure(EntityTypeBuilder<Collection> builder)
  {
    /* 1-M Relationship (Author) */
		builder.HasOne(album => album.Author)
			.WithMany(user => user.Albums)
			.HasForeignKey(album => album.AuthorId)
			.OnDelete(DeleteBehavior.Restrict);

		/* M-N Relationship (Collaborators) */
		builder.HasMany(album => album.Collaborators)
      .WithMany(user => user.CollabAlbums);
		
		/* M-N Relationship (Genres) */
		builder.HasMany(album => album.Genres)
      .WithMany(genre => genre.Albums);
  }
}
