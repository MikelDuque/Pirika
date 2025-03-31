using Server.Database.Entities;
using Server.Helpers;
using Server.Models.Enums;

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
		/* --- USERS --- */
		User[] users =
		[
			new User
			{
				Username = "Mikel",
				Mail = "mikel@catsanddots.es",
				Password = HashHelper.Hash("12345"),
				DisplayName = "Mikel",
				Avatar = "/ProfilePictures/DefaultAvatar2.png",
				Role = Role.Admin,
				IsBanned = false
			}
		];

		/* --- INSERCCIÓN ENTIDADES --- */
		_dataContext.Users.AddRange(users);
	}
}
