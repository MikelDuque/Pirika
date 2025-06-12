import { useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GET_FILE } from "../utils/endpoints/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { printPathWithId, ProfilePath, SearchPath } from "../utils/paths";
import { DynamicIcon } from "lucide-react/dynamic";
import { ChangeEvent, useState} from "react";
import { Input } from "./ui/Form";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/Navigation";
import { cn, getFirstChar, getIcon } from "../utils/utils";
import { useNav } from "../contexts";

export default function Header({className}: {className?: string}) {
  const {authData} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {tabs, changeSearchValue} = useNav();

  const [searchValue, setSearchValue] = useState<string>("");

  function actualSearchTab(tabPath: string) {
    return [tabPath, location.pathname].every(item => item === SearchPath)
  };

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value)
    changeSearchValue(e.target.value)
  }

  return (
    <header className={cn(className, "w-full flex gap-2 bg-background dark:bg-dark-background")}>
      <NavigationMenu>
        <NavigationMenuList>
          {tabs.map((tab, i) => (
            <NavigationMenuItem key={i}>
              <NavigationMenuLink className={cn(tab.path === location.pathname && navigationMenuTriggerStyle(), "flex gap-2 cursor-pointer")} onClick={() => navigate(tab.path)}>
                <DynamicIcon name={getIcon(tab.icon || tab.name)}/>
                {actualSearchTab(tab.path) ?
                  <Input value={searchValue} placeholder={tab.name} onChange={onSearchChange} variant="ghost" autoFocus/>
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
      <Avatar onClick={() => printPathWithId("User", authData?.decodedToken.id)}>
        <AvatarImage src={GET_FILE(authData?.decodedToken.avatar || "")}/>
        <AvatarFallback>{getFirstChar(authData?.decodedToken.unique_name)}</AvatarFallback>
      </Avatar>
    </header>
  )
}