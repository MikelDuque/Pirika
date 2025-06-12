import { PlayCircle } from "lucide-react";
import { GET_FILE } from "../utils/endpoints/endpoints";
import { ElementType } from "../utils/enums";
import { cn } from "../utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from "./ui/Card/Card";
import { Artist } from "../utils/types";
import { useNavigate } from "react-router-dom";
import { HTMLAttributes } from "react";
import { printPathWithId } from "../utils/paths";

interface GenericCardProps extends HTMLAttributes<HTMLDivElement> {
  img: string,
  title: string,
  author?: Artist,
  type: ElementType,
}

export default function GenericCard({img, title, author, type, ...props}: GenericCardProps) {
  const navigate = useNavigate();

  return (
    <Card {...props} className="size-full">
      <CardHeader className="relative flex items-center justify-center group">
        <Avatar className={cn("size-full", type !== ElementType.Artist && "rounded-md", type === ElementType.Collection && "shadow-[5px_-5px_0px_0px_#969696]")}>
          <AvatarImage src={GET_FILE(img)}/>
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
        <PlayCircle size={35} color="#ffffff" className={cn("absolute right-2 bottom-3 hidden", type === ElementType.Song && "group-hover:block")}/>
      </CardHeader>
      <CardFooter className="flex flex-col gap-1 text-left">
        <CardTitle className="w-full text-center truncate">{title}</CardTitle>
        {author &&
        <CardDescription onClick={() => navigate(printPathWithId("User", author.id))} className="w-full truncate hover:underline">
          {author.name}
        </CardDescription>}
      </CardFooter>
    </Card>
  )
}