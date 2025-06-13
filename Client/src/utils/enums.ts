export enum Crud {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH"
}

export enum CollectionType {
  Single,
	EP,
	Album,
	Playlist
}

export enum ElementType
{
	Song,
	Collection,
	Artist
}

export enum Genre
{
  None,
  Pop,
  Rock,
  Electronic,
  Urban,
  Latin,
  JazzAndBlues,
  Folk
}

/* RESTRICTIVE TYPES */
export type WSHeader = "MusicRelease" | "FollowRequest"

export type PathType = "Auth" | "Home" | "Search" | "Library" | "User" | "Collection" | "Publish";