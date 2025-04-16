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

		/* --- GENRES --- */
		Genre[] genres =
		[
			new Genre
			{
				Name = "Pop"
			},
			new Genre
			{
				Name = "Rock"
			},
			new Genre
			{
				Name = "Electronic"
			},
			new Genre
			{
				Name = "Urban"
			},
			new Genre
			{
				Name = "Latin"
			},
			new Genre
			{
				Name = "Jazz & Blues"
			},
			new Genre
			{
				Name = "Folk"
			},
		];

		/* --- SONGS --- */
		Song[] songs =
		[
			new Song
			{
				Title = "Cuídate",
				SongPath = "/Music/1/1.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "20 de Enero",
				SongPath = "/Music/1/2.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "El 28",
				SongPath = "/Music/1/3.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "París",
				SongPath = "/Music/1/4.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "La Playa",
				SongPath = "/Music/1/5.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Muñeca de Trapo",
				SongPath = "/Music/1/6.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Rosas",
				SongPath = "/Music/1/7.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Dulce Locura",
				SongPath = "/Music/1/8.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Cuéntame al Oído",
				SongPath = "/Music/1/9.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Vestido Azul",
				SongPath = "/Music/1/10.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Pop",
				SongPath = "/Music/1/11.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Geografía",
				SongPath = "/Music/1/12.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Mariposa",
				SongPath = "/Music/1/13.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			}
		];

		/* --- ALBUMS --- */
		Collection[] albums =
		[
			new Collection
			{
				Title = "Grandes Éxitos",
				Cover = "/Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now,
				Type = CollectionType.Album
			}
		];

		/* --- INSERCCIÓN ENTIDADES --- */
		_dataContext.Users.AddRange(users);
		_dataContext.Genres.AddRange(genres);
		_dataContext.SaveChanges();

		_dataContext.Songs.AddRange(songs);
		_dataContext.Albums.AddRange(albums);
	}
}
