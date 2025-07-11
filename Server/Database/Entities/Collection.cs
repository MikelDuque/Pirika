﻿using Server.Models.Enums;

namespace Server.Database.Entities;

public class Collection : Music
{
	public required CollectionType Type { get; set; }

	/* M-N Relationships */
	public ICollection<Song> Songs { get; set; } = new List<Song>();
}