import { ReactNode } from "react";
import { CollectionType, Crud, ElementType, Genre, WSHeader } from "./enums";

/* ----- FRONT ONLY ----- */
export interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
  error?: {
    message?: string;
  };
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


/* ----- BACK & FRONT ----- */

// export interface TaskResult<T> {
//   asyncState: any;
//   creationOptions: number;
//   exception: any;
//   id: number;
//   isCanceled: boolean;
//   isCompleted: boolean;
//   isCompletedSuccessfully: boolean;
//   isFaulted: boolean;
//   result: T;
//   status: number;
// }

export interface FetchProps {
  url: string;
  type?: Crud;
  params?: BodyInit | object;
  condition?: boolean;
};

//Authentication Data
export interface AuthData {
  token: string,
  decodedToken: DecodedToken
}

  export interface DecodedToken {
    id: number,
    unique_name: string,
    email: string,
    role: string,
    avatar: string,
    exp: number,
  };

//Elements
export interface Artist {
  id: number,
  name: string,
  avatar: string,
  followers: number,
  following: number,
  music: Collection[]
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

//Search
export interface Filter {
  search?: string,
  genres?: Genre[],
	types?: ElementType[],
	itemsPerPage?: number,
	currentPage?: number
}

export interface BasicElement {
  id: number,
  name: string,
  image: string,
  type: ElementType
}

// export interface FilterResult {
//   songs: Song[],
// 	collections: Collection[],
// 	artists: Artist[]
// }

//Websockets
export interface WSMessage<T = unknown> {
  header: WSHeader,
  body: T
}