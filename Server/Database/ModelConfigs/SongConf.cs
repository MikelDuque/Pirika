using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;

public class SongConf : IEntityTypeConfiguration<Song>
{
  public void Configure(EntityTypeBuilder<Song> builder)
  {
    /* 1-M Relationship (Author) */
		builder.HasOne(song => song.Author)
			.WithMany(user => user.Songs)
			.HasForeignKey(song => song.AuthorId)
			.OnDelete(DeleteBehavior.Restrict);

		/* M-N Relationship (Collaborators) */
		builder.HasMany(songg => songg.Collaborators)
      .WithMany(user => user.CollabSongs);
  }
}
