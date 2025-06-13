import { GET_FILE } from "../../../utils/endpoints/endpoints";
import { ElementType } from "../../../utils/enums";
import { BasicElement } from "../../../utils/types";
import { cn, getFirstChar } from "../../../utils/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./Avatar";

interface AvatarWrapper {
  element?: BasicElement,
  className: string
}

export default function AvatarWrapper({element, className}: AvatarWrapper) {
  return (
    <Avatar className={cn(element?.type !== ElementType.Artist && "rounded-md", element?.type === ElementType.Collection && "shadow-[5px_-5px_0px_0px_#969696]", className)}>
      <AvatarImage src={element && GET_FILE(element.image)}/>
      <AvatarFallback>{getFirstChar(element?.name)}</AvatarFallback>
    </Avatar>
  )
}