import { GET_FILE } from "../utils/endpoints/endpoints";
import { ElementType } from "../utils/enums";
import { cn } from "../utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from "./ui/Card/Card";

interface GenericCard {
  img: string,
  title: string,
  type: ElementType
}

export default function GenericCard({img, title, type}: GenericCard) {
  console.log("cover path", GET_FILE(img));
  

  return (
    <Card>
      <CardHeader className="flex items-center justify-center">
        <Avatar className={cn(type !== ElementType.Artist && "rounded-md")}>
          <AvatarImage src={GET_FILE(img)}/>
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardFooter className="flex flex-col gap-1 text-left">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{ElementType[type]}</CardDescription>
      </CardFooter>
    </Card>
  )
}