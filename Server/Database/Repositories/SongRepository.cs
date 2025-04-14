using Server.Database.Entities;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class SongRepository : Repository<Song>
{
  public SongRepository(DataContext dataContext) : base(dataContext) { }
}