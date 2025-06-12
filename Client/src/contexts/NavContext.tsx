import { createContext, PropsWithChildren, useContext, useState } from "react";
import { HomePath, printPathWithId, SearchPath } from "../utils/paths";
import { Artist, BasicElement, Collection, Filter } from "../utils/types";
import { ElementType, PathType } from "../utils/enums";
import _ from "lodash";
import { IconName } from "lucide-react/dynamic";
import { getFromStorage, getIcon } from "../utils/utils";
import { useNavigate } from "react-router-dom";

/* ---- TIPADOS ---- */
interface Tab {
  name: string,
  path: string,
  icon: IconName,

}

type pageData = Artist | Collection;

interface NavContext {
  searchFilter: Filter,
  tabs: Tab[],
  pageData?: pageData,
  changeSearchValue: (search: string) => void,
  addTab: (newTab: Tab) => void,
  newTab: (pathType: PathType, element: BasicElement) => void
}

/* ----- DEFAULT VALUES ----- */
const defaultFilter: Filter = {
  search: "",  
  genres: [],
  types: [ElementType.Artist, ElementType.Song, ElementType.Collection],
  itemsPerPage: -1,
  currentPage: 0
}

const defaultTabs: Tab[] = [
  {name: "Home", path: HomePath, icon: "home"},
  {name: "Search", path: SearchPath, icon: "search"}
]

/* ----- DECLARACIÓN CONTEXT ----- */
const AuthContext = createContext<NavContext>({
  tabs: defaultTabs,
  searchFilter: defaultFilter,
  changeSearchValue: () => {},
  addTab: () => {},
  newTab: () => {}
});

export const useNav = (): NavContext => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

/* ----- CUERPO CONTEXT ----- */
export function NavProvider({ children }: PropsWithChildren) {
  const navigate = useNavigate();
  // const location = useLocation();
  // const {id} = useParams();
  // const getUrl = () => {
  //   if(!id) return "";
  //   return location.pathname === ProfilePath ? GET_USER(id || 0) : GET_COLLECTION(id || 0);
  // }
  // const {fetchData: pageData} = useFetch<Artist | Collection>({url: getUrl(), condition: !!id});

  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [searchFilter, setSearchFilter] = useState<Filter>(defaultFilter);

  // useEffect(() => {
  //   const tabPaths = tabs.map(tab => tab.path); 
  //   if(!tabPaths.includes(location.pathname)) addTab();

  // }, [location])

  function addTab(newTab: Tab) {
    const tabPaths = tabs.map(tab => tab.path); 
    if(!tabPaths.includes(newTab.path)) setTabs(prevTabs => [...prevTabs, {...newTab}]);
  };

  function newTab(pathType: PathType, element: BasicElement) {
    const thisPath = printPathWithId(pathType, element.id);
    const haveTab = tabs.some(tab => tab.path === thisPath);
    const isInStorage = getFromStorage(thisPath);

    if(!haveTab && !isInStorage) {
      const newTab: Tab = {
        name: setTabName(pathType, element.name),
        path: thisPath,
        icon: getTabIcon(pathType)
      }

      setTabs(prevTabs => [...prevTabs, {...newTab}]);
      sessionStorage.setItem(thisPath, JSON.stringify(element));
    }

    navigate(thisPath);
  }

  // function addTab() {
  //   const newTab = getTabFromPath(location.pathname, pageData);
  //   if(newTab) setTabs(prevTabs => [...prevTabs, {...newTab}]);
  // };

  function changeSearchValue(search: string) {
    setSearchFilter(prevFilter => (prevFilter.search === search ? prevFilter : {...prevFilter, search}))
  }

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    tabs,
    searchFilter,
    changeSearchValue,
    addTab,
    newTab
  };

  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};

function setTabName(pathName: PathType, elementName?: string) {
  const idPaths: PathType[] = ["User", "Collection"];

  if(idPaths.includes(pathName)) return elementName ?? "Unknown";
  return pathName;
}

////////////

function getTabFromPath(path: string, pageData?: pageData): Tab | null {
  const match = path.match(/^\/([^\/]+)/);
  if(!match || !pageData) return null;

  const pathName = match[1] as PathType;

  return {
    name: getRealName(pathName, pageData),
    path: path,
    icon: getTabIcon(pathName)
  }
}

function getRealName(pathName: PathType, data?: Artist | Collection) {
  if(!data) return "Unknown";
  
  switch (pathName) {
    case "User": return (data as Artist).name;
    case "Collection": return (data as Collection).title;
    default: return pathName;
  }
}

function getTabIcon(pathName: PathType): IconName {
  let iconName: IconName;

  if(pathName === "Collection") iconName = "disc-album";
  else iconName = getIcon(pathName);

  return iconName;
}