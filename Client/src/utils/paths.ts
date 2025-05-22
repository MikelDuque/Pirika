function printPath(path: string) {
  return `${Index}${path}/`
}

export const Index = "/";
// export const ErrorPath = RootPath + "/Error";
// export const IntroPath = RootPath + "Intro/";
export const AuthPath = printPath("Auth");
export const HomePath = printPath("Home");
export const SearchPath = printPath("Search");
export const LibraryPath = printPath("Library");

export const ProfilePath = printPath("User");
export function ThisProfilePath(id: string | number) {return printPath(`${ProfilePath}${id}`)};

export const CollectionPath = printPath("Collection")
export function ThisCollectionPath(id: string | number) {return printPath(`${CollectionPath}${id}`)}