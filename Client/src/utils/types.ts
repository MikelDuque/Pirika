import { CollectionType, Crud, ElementType } from "./enums";

export interface TaskResult<T> {
  asyncState: any;
  creationOptions: number;
  exception: any;
  id: number;
  isCanceled: boolean;
  isCompleted: boolean;
  isCompletedSuccessfully: boolean;
  isFaulted: boolean;
  result: T;
  status: number;
}

export interface ChildrenProp {
  children: React.ReactNode
}

export interface FetchProps {
  url: string;
  type: Crud;
  token?: string;
  params?: BodyInit | object;
  needAuth?: boolean;
  condition?: boolean;
};

export interface DecodedToken {
  id: number,
  unique_name: string,
  email: string,
  role: string,
  avatar: string,
  exp: number,
};

export interface AuthData {
  token: string,
  decodedToken: DecodedToken
}

export interface Artist {
  id: number,
  name: string,
  avatar: string
}

export interface Song {
  id: number,
	title: string,
	cover: string,
  path: string,
	releaseDate: string,
	publicationDate: string,
  author: Artist
}

export interface Collection {
  id: number,
  title: string,
  cover: string,
  releaseDate: string,
  publicationDate: string,
  type: CollectionType,
  author: Artist,
  songs: Song[]
}

export interface Filter {
  genres: unknown[], //Esto será un ENUM
  search: string,
	types: ElementType[],
	itemsPerPage: number,
	currentPage: number
}

export interface FilterResult {
  songs: Song[],
	collections: Collection[],
	artists: Artist[]
}

export interface Player {
  currentSong: number,
  isPlaying: boolean,
  duration: number,
  currentTime: number,
  volume: number,
  isMuted: boolean,
  repeat: boolean
}