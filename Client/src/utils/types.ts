import { CollectionType, Crud } from "./enums";

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
  name: string
}

export interface Song {
  id: number,
	title: string,
	cover: string,
  path: string,
	releaseDate: string,
	publicationDate: string
}

export interface Collection {
  id: number,
  title: string,
  cover: string,
  releaseDate: string,
  publicationDate: string,
  type: CollectionType,
  songs: Song[]
}