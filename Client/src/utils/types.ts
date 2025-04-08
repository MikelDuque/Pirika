import { Crud } from "./enums";

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