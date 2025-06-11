using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Server.Database.Entities;
using Server.Database.Entities.Relationships;

namespace Server.Database;

public class DataContext : DbContext
{
	/* ENTITIES */
	public DbSet<Genre> Genres { get; set; }
	public DbSet<User> Users { get; set; }
	public DbSet<Music> Music { get; set; }
	public DbSet<Song> Songs { get; set; }
	public DbSet<Collection> Collections { get; set; }

	/* ENTITIES */
	public DbSet<Follow> Follows { get; set; }
	public DbSet<Collaboration> Collaborations { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		string baseDir = AppDomain.CurrentDomain.BaseDirectory;
		string localPath = Environment.GetEnvironmentVariable("LOCAL_DATABASE");
		string connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");

#if DEBUG
			optionsBuilder.EnableSensitiveDataLogging();
			optionsBuilder.UseSqlite($"DataSource={baseDir}{localPath}");
		#else
			optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
		#endif
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		modelBuilder.ApplyConfiguration(new MusicConf());
		modelBuilder.ApplyConfiguration(new CollabsConf());
		modelBuilder.ApplyConfiguration(new FollowsConf());
		/* 
		Puedo cambiarlo por esto en caso de especificar más configuraciones de OnModelcreating:
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
		*/
	}

}