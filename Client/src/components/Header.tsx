import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { GET_FILE } from "../utils/endpoints/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Tabs, TabsList, TabsTrigger } from "./ui/Tabs";
import { HomePath, SearchPath } from "../utils/paths";
import { DynamicIcon } from "lucide-react/dynamic";
import { ComponentProps, ReactNode, useState } from "react";
import camelCase from "lodash/camelCase";
import { Input } from "./ui/Form";

export default function Header() {
  const {authData} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
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

  return (
    <header className="w-full flex gap-2 p-2">
      <Tabs value={location.pathname} className="grow">
        <TabsList className="p-0">
          {tabs.map(tab => (
            <TabsTrigger value={tab.path} onClick={() => navigate(tab.path)} className="flex gap-2">
              <DynamicIcon name={getIcon(tab.name)}/>
              {actualSearchTab(tab.path) ?
                <Input placeholder={tab.name} className="h-2"/>
                :
                tab.name
              }
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <Avatar>
        <AvatarImage src={GET_FILE(authData?.decodedToken.avatar || "")}/>
        <AvatarFallback>{getInitial()}</AvatarFallback>
      </Avatar>
    </header>
  )
}