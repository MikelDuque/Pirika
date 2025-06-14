import { CollectionType, Crud, ElementType, Genre, WSHeader } from "./enums";
import { IconName } from "lucide-react/dynamic";

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

export interface Tab {
  name: string,
  path: string,
  icon: IconName,
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

interface FetchProps {
  url: string;
  type?: Crud;
  params?: BodyInit | object;
  condition?: boolean;
};

export interface FetchHook extends FetchProps {
  condition?: boolean;
}

export interface FetchFunction extends FetchProps {
  token?: string
}

//Authentication Data
export interface AuthData {
  token: string,
  decodedToken: DecodedToken
}

  export interface DecodedToken {
    id: number,
    unique_name: string,
    displayName: string,
    email: string,
    role: string,
    avatar: string,
    exp: number,
  };

//Elements
export interface BasicElement {
  id: number,
  name: string,
  image: string,
  type: ElementType,
  subElements?: BasicElement[]
}

export interface Artist {
  id: number,
  name: string,
  avatar: string,
  followers: number,
  following: number,
  music: BasicElement[]
}

export interface Music {
  id: number,
	title: string,
	cover: string,
  path: string,
	releaseDate: string,
	publicationDate: string,
  author: BasicElement,
  collaborators: BasicElement[]
}

export interface Song extends Music {
  path: string
}

export interface Collection extends Music {
  songs: Song[]
  type: CollectionType
}

//Search
export interface Filter {
  search?: string,
  genres?: Genre[],
	types?: ElementType[],
	itemsPerPage?: number,
	currentPage?: number
}

//Others
export interface Request {
  senderId: number | string,
	targetId: number | string
}


//Websockets
export interface WSMessage<T = unknown> {
  header: WSHeader,
  body: T
}

export interface NewRelease {
  title: string,
  author: string,
  path: string
}