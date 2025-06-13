import { PathType } from "./enums";

function printPath(path: PathType) {
  return `${Index}${path}/`
}

export function printPathWithId(path: PathType, id?: number | string) {
  return `${printPath(path)}${id}`;
}

//PATHS
export const Index = "/";

export const AuthPath = printPath("Auth");
export const HomePath = printPath("Home");
export const SearchPath = printPath("Search");
export const LibraryPath = printPath("Library");

export const ProfilePath = printPath("User");
export const CollectionPath = printPath("Collection");

export const PublishPath = printPath("Publish");