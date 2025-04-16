using Server.Database.Entities;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class AlbumRepository : Repository<Collection>
{
  public AlbumRepository(DataContext dataContext) : base(dataContext) { }
}