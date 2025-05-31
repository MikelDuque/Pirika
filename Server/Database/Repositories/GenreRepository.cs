using Server.Database.Entities;
using Server.Database.Repositories.Common;

namespace Server.Database.Repositories;

public class GenreRepository : Repository<Genre>
{
  public GenreRepository(DataContext dataContext) : base(dataContext) { }
}