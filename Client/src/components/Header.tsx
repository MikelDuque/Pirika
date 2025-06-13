import { useLocation, useNavigate} from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GET_FILE } from "../utils/endpoints/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { printPathWithId, PublishPath, SearchPath } from "../utils/paths";
import { DynamicIcon } from "lucide-react/dynamic";
import { ChangeEvent, useState} from "react";
import { Input } from "./ui/Form";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "./ui/Navigation";
import { cn, getFirstChar, getIcon } from "../utils/utils";
import { useNav } from "../contexts";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/DropdownMenu";

export default function Header({className}: {className?: string}) {
  const {authData, logOut} = useAuth();
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
      <NavigationMenu className="flex-1">
        <NavigationMenuList className="overflow-x-auto">
          {tabs.map((tab, i) => (
            <NavigationMenuItem key={i} className="cursor-pointer">
              <NavigationMenuLink className={cn(tab.path === location.pathname && navigationMenuTriggerStyle(), "flex gap-2 truncate")} onClick={() => navigate(tab.path)}>
                <DynamicIcon name={tab.icon}/>
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
      
      <DropdownMenu>
        <DropdownMenuTrigger >
          <Avatar className="cursor-pointer">
            <AvatarImage src={GET_FILE(authData?.decodedToken.avatar || "")}/>
            <AvatarFallback>{getFirstChar(authData?.decodedToken.unique_name)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => navigate(printPathWithId("User", authData?.decodedToken.id))}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {navigate(PublishPath)}}>
            Publish music
          </DropdownMenuItem>
          <DropdownMenuItem onClick={logOut}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
    </header>
  )
}