import { GET_FILE } from "../utils/endpoints/endpoints";
import { ElementType } from "../utils/enums";
import { cn } from "../utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Card, CardHeader, CardDescription, CardFooter, CardTitle } from "./ui/Card/Card";

interface GenericCard extends React.HTMLAttributes<HTMLDivElement> {
  img: string,
  title: string,
  type: ElementType,
}

export default function GenericCard({img, title, type, ...props}: GenericCard) {
  return (
    <Card {...props}>
      <CardHeader className="flex items-center justify-center">
        <Avatar className={cn(type !== ElementType.Artist && "rounded-md", "size-25")}>
          <AvatarImage src={GET_FILE(img)}/>
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardFooter className="flex flex-col gap-1 text-left">
        <CardTitle className="w-full text-center truncate">{title}</CardTitle>
        <CardDescription>{ElementType[type]}</CardDescription>
      </CardFooter>
    </Card>
  )
}