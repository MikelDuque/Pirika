using System.Reflection.Emit;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;

public class FollowsConf : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
		builder.HasMany(u => u.Followers)
				.WithMany(u => u.Following)
				.UsingEntity<Follow>(
						j => j.HasOne(uf => uf.Follower).WithMany(),
						j => j.HasOne(uf => uf.Following).WithMany()
				);
	}
}
