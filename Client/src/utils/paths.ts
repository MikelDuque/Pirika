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