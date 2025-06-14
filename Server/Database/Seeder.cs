using Server.Database.Entities;
using Server.Database.Entities.Relationships;
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
				Mail = "mikel@gmail.es",
				Password = HashHelper.Hash("12345"),
				DisplayName = "Mikel",
				Avatar = "ProfilePictures/DefaultAvatar2.jpg",
				Role = Role.Admin,
				IsBanned = false
			},
			new User {
				Username = "LODVG",
				Mail = "lodvg@gmail.es",
				Password = HashHelper.Hash("12345"),
				DisplayName = "La Oreja de Van Gogh",
				Avatar = "ProfilePictures/2.webp",
				Role = Role.None,
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
				Path = "Music/1/1.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "20 de Enero",
				Path = "Music/1/2.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "El 28",
				Path = "Music/1/3.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "París",
				Path = "Music/1/4.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "La Playa",
				Path = "Music/1/5.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Muñeca de Trapo",
				Path = "Music/1/6.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Rosas",
				Path = "Music/1/7.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Dulce Locura",
				Path = "Music/1/8.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Cuéntame al Oído",
				Path = "Music/1/9.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Vestido Azul",
				Path = "Music/1/10.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Pop",
				Path = "Music/1/11.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Geografía",
				Path = "Music/1/12.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Mariposa",
				Path = "Music/1/13.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now
			}
		];

		/* --- ALBUMS --- */
		Collection[] albums =
		[
			new Collection
			{
				Title = "Grandes Éxitos",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 2,
				PublicationDate = DateTime.Now,
				Type = CollectionType.Album,
				Songs = songs
			}
		];

		/* --- FOLLOW RELATIONSHIPS --- */
		Follow[] follows =
		[
			new Follow
			{
				UserAId = 1,
				UserBId = 2,
				FriendshipStart = null
			}
		];


		/* --- INSERCCIÓN ENTIDADES --- */
		_dataContext.Genres.AttachRange(genres);
		_dataContext.Users.AddRange(users);
		_dataContext.SaveChanges();

		_dataContext.Collections.AddRange(albums);
		_dataContext.Follows.AddRange(follows);
		_dataContext.SaveChanges();
	}
}
