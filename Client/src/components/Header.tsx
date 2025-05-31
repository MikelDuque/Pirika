import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GET_FILE } from "../utils/endpoints/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { HomePath, SearchPath } from "../utils/paths";
import { DynamicIcon } from "lucide-react/dynamic";
import { ComponentProps} from "react";
import camelCase from "lodash/camelCase";
import { Input } from "./ui/Form";
import { useAudio } from "../contexts/AudioContext";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/Navigation";
import { cn } from "../utils/utils";

export default function Header({className}: {className?: string}) {
  const {authData} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {searchValue, changeSearchValue} = useAudio();
  
  function getInitial() {
    const name = authData?.decodedToken.unique_name || "?";
    return name[0];
  }

  function getIcon(iconName: string) {
    type IconName = ComponentProps<typeof DynamicIcon>["name"];

    return camelCase(iconName) as IconName;
  }

  const tabs = [
    {
      path: HomePath,
      name: "Home"
    },
    {
      path: SearchPath,
      name: "Search"
    }
  ];

  function actualSearchTab(tabPath: string) {
    return [tabPath, location.pathname].every(item => item === SearchPath)
  };

  function setSearchValue(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    changeSearchValue(e.target.value)
  }

  return (
    <header className={cn(className, "w-full flex gap-2 bg-background dark:bg-dark-background")}>
      <NavigationMenu>
        <NavigationMenuList>
          {tabs.map(tab => (
            <NavigationMenuItem>
              <NavigationMenuLink className={cn(tab.path === location.pathname && navigationMenuTriggerStyle(), "flex gap-2 cursor-pointer")} onClick={() => navigate(tab.path)}>
                <DynamicIcon name={getIcon(tab.name)}/>
                {actualSearchTab(tab.path) ?
                  <Input value={searchValue?.search} placeholder={tab.name} onChange={setSearchValue} variant="ghost" autoFocus/>
                  :
                  tab.name
                }
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      {/* <Tabs value={location.pathname} className="grow">
        <TabsList className="p-0">
          {tabs.map(tab => (
            <TabsTrigger value={tab.path} onClick={() => navigate(tab.path)} className="flex gap-2">
              <DynamicIcon name={getIcon(tab.name)}/>
              {actualSearchTab(tab.path) ?
                <Input defaultValue="" placeholder={tab.name} className="h-2" onChange={setSearchValue}/>
                :
                tab.name
              }
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs> */}
      <Avatar>
        <AvatarImage src={GET_FILE(authData?.decodedToken.avatar || "")}/>
        <AvatarFallback>{getInitial()}</AvatarFallback>
      </Avatar>
    </header>
  )
}