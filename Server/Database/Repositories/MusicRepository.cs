using eCommerce.Services;
using Server.Database.Entities;
using Server.Database.Repositories.Common;
using Server.Models.Enums;

namespace Server.Database.Repositories;

public class MusicRepository : Repository<Music>
{
	public MusicRepository(DataContext dataContext) : base(dataContext) { }
}
