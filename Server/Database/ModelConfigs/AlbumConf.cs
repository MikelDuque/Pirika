using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;

public class AlbumConf : IEntityTypeConfiguration<Album>
{
  public void Configure(EntityTypeBuilder<Album> builder)
  {
    /* 1-M Relationship (Author) */
		builder.HasOne(album => album.Author)
			.WithMany(user => user.Albums)
			.HasForeignKey(album => album.AuthorId)
			.OnDelete(DeleteBehavior.Restrict);

		/* M-N Relationship (Collaborators) */
		builder.HasMany(album => album.Collaborators)
      .WithMany(user => user.CollabAlbums);
  }
}
