import { PlayCircle } from "lucide-react";
import { ElementType } from "../utils/enums";
import { cn } from "../utils/utils";
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from "./ui/Card/Card";
import { BasicElement } from "../utils/types";
import { AvatarWrapper } from "./ui/Avatar";
import { useNav } from "../contexts";
import React from "react";

interface GenericCardProps extends React.HTMLAttributes<HTMLDivElement> {
  element?: BasicElement
}

export function GenericCard({element, ...props}: GenericCardProps) {
  const {openTab} = useNav();

  function handleSubClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();

    const author = element?.subElements?.[0];
    if(author) openTab("User", author)
  }

  return (
    <Card {...props} className="size-full cursor-pointer border-transparent">
      <CardHeader className="relative flex items-center justify-center group">
        <AvatarWrapper element={element} className="size-full"/>
        <PlayCircle size={35} color="#ffffff" className={cn("absolute right-2 bottom-3 hidden", element?.type === ElementType.Song && "group-hover:block")}/>
      </CardHeader>
      <CardFooter className="flex flex-col gap-1 text-center">
        <CardTitle className="w-full subtitle truncate">{element?.name}</CardTitle>
        <CardDescription onClick={handleSubClick} className="w-full body text-gray truncate h-4 hover:underline">
          {element?.subElements?.[0].name}
        </CardDescription>
      </CardFooter>
    </Card>
  )
}