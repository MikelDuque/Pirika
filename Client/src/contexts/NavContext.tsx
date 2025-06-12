import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { HomePath, printPathWithId, SearchPath } from "../utils/paths";
import { BasicElement, Filter, Tab } from "../utils/types";
import { ElementType, PathType } from "../utils/enums";
import _ from "lodash";
import { IconName } from "lucide-react/dynamic";
import { getFromStorage, getIcon } from "../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

/* ---- TIPADOS ---- */
interface NavContext {
  searchFilter: Filter,
  tabs: Tab[]
  changeSearchValue: (search: string) => void,
  addTab: (pathType: PathType, element: BasicElement) => void
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
  addTab: () => {}
});

export const useNav = (): NavContext => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

/* ----- CUERPO CONTEXT ----- */
export function NavProvider({ children }: PropsWithChildren) {
  // const location = useLocation();
  const navigate = useNavigate();

  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [searchFilter, setSearchFilter] = useState<Filter>(defaultFilter);
  
  // useEffect(() => {
  //   updateTabs();
  // }, [location]);

  // function updateTabs() {
  //   const haveTab = tabs.some(tab => tab.path === location.pathname);
  //   if(!haveTab) {
  //     const thisElement = getFromStorage<BasicElement>(location.pathname);

  //     if(thisElement) {
  //       const newTab = getTabFromPath(location.pathname, thisElement.name);
        
  //       if(newTab) setTabs(prevTabs => [...prevTabs, {...newTab}]);
  //     }
  //   }
  // }


  //Functions

  function addTab(pathType: PathType, element: BasicElement) {
    const thisPath = printPathWithId(pathType, element.id);
    const haveTab = tabs.some(tab => tab.path === thisPath);
    const storageItem = getFromStorage(thisPath);

    sessionStorage.setItem(thisPath, JSON.stringify(element));

    if(!haveTab && !storageItem) {
      const newTab: Tab = {
        name: setTabName(pathType, element.name),
        path: thisPath,
        icon: setTabIcon(pathType)
      }

      setTabs(prevTabs => [...prevTabs, {...newTab}]);
      sessionStorage.setItem(thisPath, JSON.stringify(element));
    }

    navigate(thisPath);
  }

  function changeSearchValue(search: string) {
    setSearchFilter(prevFilter => (prevFilter.search === search ? prevFilter : {...prevFilter, search}))
  }

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    tabs,
    searchFilter,
    changeSearchValue,
    addTab
  };

  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};


/* EXTERNAL FUNCTIONS */

function setTabName(pathName: PathType, elementName?: string) {
  const idPaths: PathType[] = ["User", "Collection"];

  if(idPaths.includes(pathName)) return elementName ?? "Unknown";
  return pathName;
}

function setTabIcon(pathName: PathType) {
  let iconName: IconName;

  if(pathName === "Collection") iconName = "disc-album";
  else iconName = getIcon(pathName);

  return iconName;
}

// function getTabFromPath(path: string, elementName?: string) {
//   const match = path.match(/^\/([^\/]+)/);
//   if(!match || !elementName) return;

//   const pathName = match[1] as PathType;

//   return {
//     name: setTabName(pathName, elementName),
//     path: path,
//     icon: setTabIcon(pathName)
//   }
// }