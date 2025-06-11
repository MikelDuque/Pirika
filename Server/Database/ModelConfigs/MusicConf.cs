using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;

public class MusicConf : IEntityTypeConfiguration<Music>
{
  public void Configure(EntityTypeBuilder<Music> builder)
  {
    /* 1-M Relationship (Author) */
		builder.HasOne(music => music.Author)
			.WithMany(user => user.OwnMusic)
			.HasForeignKey(music => music.AuthorId)
			.OnDelete(DeleteBehavior.Restrict);

		///* M-N Relationship (Collaborators) */
		//builder.HasMany(music => music.Collaborators)
  //    .WithMany(user => user.Collaborations);
	}
}
