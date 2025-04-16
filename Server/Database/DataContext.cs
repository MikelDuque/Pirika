using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;

namespace Server.Database;

public class DataContext : DbContext
{
	/* ENTITIES */
	public DbSet<User> Users { get; set; }
	public DbSet<Song> Songs { get; set; }
	public DbSet<Collection> Albums { get; set; }
	public DbSet<Genre> Genres { get; set; }

	//Relationships
	public DbSet<Queue> Queues { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		string baseDir = AppDomain.CurrentDomain.BaseDirectory;
		string localPath = Environment.GetEnvironmentVariable("LOCAL_DATABASE");
		string connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");

		#if DEBUG
			optionsBuilder.UseSqlite($"DataSource={baseDir}{localPath}");
		#else
			optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
		#endif
	}

	protected override void OnModelCreating(ModelBuilder modelBuilder)
	{
		base.OnModelCreating(modelBuilder);

		modelBuilder.ApplyConfiguration(new AlbumConf());
		modelBuilder.ApplyConfiguration(new SongConf());
		/* 
		Puedo cambiarlo por esto en caso de especificar más configuraciones de OnModelcreating:
		modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);
		*/
	}

}