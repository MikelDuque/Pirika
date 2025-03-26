using Microsoft.EntityFrameworkCore;
using Server.Database.Entities;

namespace Server.Database;

public class DataContext : DbContext
{
	/* ENTITIES */
	public DbSet<User> Users { get; set; }

	protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
	{
		string baseDir = AppDomain.CurrentDomain.BaseDirectory;
		string localPath = Environment.GetEnvironmentVariable("LOCAL_DATABASE");
		string connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION");

		#if DEBUG
				optionsBuilder.UseSqlite($"DataSource={baseDir}{localPath}");
		#else
				optionsBuilder.UseMySql(connectionString,ServerVersion.AutoDetect(connectionString));
		#endif
	}
}