namespace Server.Database;

public class Seeder
{
	private readonly DataContext _dataContext;

	public Seeder(DataContext dataContext)
	{
		_dataContext = dataContext;
	}

	public void SeedAll()
	{
		Seed();
		_dataContext.SaveChanges();
	}

	private void Seed()
	{
	}
}
