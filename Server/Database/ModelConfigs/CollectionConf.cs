using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;

public class CollectionConf : IEntityTypeConfiguration<Collection>
{
  public void Configure(EntityTypeBuilder<Collection> builder)
  {
    /* 1-M Relationship (Author) */
		builder.HasOne(collection => collection.Author)
			.WithMany(user => user.Collections)
			.HasForeignKey(collection => collection.AuthorId)
			.OnDelete(DeleteBehavior.Restrict);

		/* M-N Relationship (Collaborators) */
		builder.HasMany(collection => collection.Collaborators)
      .WithMany(user => user.CollabCollections);
  }
}
