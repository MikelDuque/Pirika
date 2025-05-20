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
				Mail = "mikel@catsanddots.es",
				Password = HashHelper.Hash("12345"),
				DisplayName = "Mikel",
				Avatar = "/ProfilePictures/defaultAvatar2.jpg",
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
				Path = "/Music/1/1.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "20 de Enero",
				Path = "/Music/1/2.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "El 28",
				Path = "/Music/1/3.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "París",
				Path = "/Music/1/4.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "La Playa",
				Path = "/Music/1/5.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Muñeca de Trapo",
				Path = "/Music/1/6.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Rosas",
				Path = "/Music/1/7.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Dulce Locura",
				Path = "/Music/1/8.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Cuéntame al Oído",
				Path = "/Music/1/9.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Vestido Azul",
				Path = "/Music/1/10.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Pop",
				Path = "/Music/1/11.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Geografía",
				Path = "/Music/1/12.mp3",
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now
			},
			new Song
			{
				Title = "Mariposa",
				Path = "/Music/1/13.mp3",
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
				Cover = "Covers/1/A_1.jpg",
				ReleaseDate = new DateOnly(2008, 06, 18),
				AuthorId = 1,
				PublicationDate = DateTime.Now,
				Type = CollectionType.Album,
				Songs = songs
			}
		];

		/* --- ALBUM-SONG RELATIONSHIP --- */
		CollectionSong[] relationships =
		[
			new CollectionSong { SongId = 1, CollectionId = 1 },
			new CollectionSong { SongId = 2, CollectionId = 1 },
			new CollectionSong { SongId = 3, CollectionId = 1 },
			new CollectionSong { SongId = 4, CollectionId = 1 },
			new CollectionSong { SongId = 5, CollectionId = 1 },
			new CollectionSong { SongId = 6, CollectionId = 1 },
			new CollectionSong { SongId = 7, CollectionId = 1 },
			new CollectionSong { SongId = 8, CollectionId = 1 },
			new CollectionSong { SongId = 9, CollectionId = 1 },
			new CollectionSong { SongId = 10, CollectionId = 1 },
			new CollectionSong { SongId = 11, CollectionId = 1 },
			new CollectionSong { SongId = 12, CollectionId = 1 },
			new CollectionSong { SongId = 13, CollectionId = 1 }
		];

		/* --- INSERCCIÓN ENTIDADES --- */
		_dataContext.Users.AddRange(users);
		_dataContext.Genres.AddRange(genres);
		_dataContext.SaveChanges();

		//_dataContext.Songs.AddRange(songs);
		_dataContext.Collections.AddRange(albums);
		_dataContext.SaveChanges();

		//_dataContext.CollectionSongs.AddRange(relationships);

	}
}
