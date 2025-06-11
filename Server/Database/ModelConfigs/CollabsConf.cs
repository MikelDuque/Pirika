using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;

public class CollabsConf : IEntityTypeConfiguration<Collaboration>
{
  public void Configure(EntityTypeBuilder<Collaboration> builder)
  {
		builder.HasOne(c => c.User)
					 .WithMany(u => u.Collaborations)
					 .OnDelete(DeleteBehavior.Restrict);

		builder.HasOne(c => c.Music)
				.WithMany(m => m.Collaborations)
				.OnDelete(DeleteBehavior.Restrict);
	}
}
