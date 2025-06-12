import { useLocation, useParams } from "react-router-dom";
import { printPathWithId, ProfilePath } from "../utils/paths";
import { GET_COLLECTION, GET_FILE, GET_USER } from "../utils/endpoints/endpoints";
import { useFetch } from "../utils/endpoints/useFetch";
import { Artist, BasicElement, Collection, Song } from "../utils/types";
import { useNav } from "../contexts";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import ButtonWithIcons from "../components/ui/Button/ButtonWrapper";
import { ElementType } from "../utils/enums";
import { cn, getFirstChar, getFromStorage } from "../utils/utils";

interface commonElement extends BasicElement {
  author: Artist | null,
  songs: Song[]
}

export default function Element() {
  // const {id} = useParams();
  const location = useLocation();
  // const isUser = location.pathname === printPathWithId("User", id);

  // const {addTab} = useNav();
  // const {fetchData} = useFetch<Artist | Collection>({url: isUser ? GET_USER(id || 0) : GET_COLLECTION(id || 0), condition: !!id});
  // const [thisElement, setThisElement] = useState<commonElement>();

  const thisElement = getFromStorage<BasicElement>(location.pathname);
  
  // useEffect(() => {
  //   if(!fetchData) return;

  //   const common = getCommonElement(fetchData);

  //   setThisElement(common);

  //   addTab({
  //     name: common.name,
  //     path: location.pathname,
  //     icon: isUser ? "user" : "disc-album"
  //   })
  // }, [fetchData])

  return (
    <section className="size-full flex flex-col">
      <div className="flex flex-col h-fit">
        <div className="flex flex-1 px-5 py-3 gap-5 justify-between items-end" style={{backgroundColor: randomHexColour()}}>
          <Avatar className={cn("size-24 translate-y-1/2", thisElement?.type === ElementType.Collection && "rounded-none")}>
            <AvatarImage src={thisElement && GET_FILE(thisElement.image)}/>
            <AvatarFallback>{getFirstChar(thisElement?.name)}</AvatarFallback>
          </Avatar>
          <span className="w-full super-title">{thisElement?.name}</span>
          <ButtonWithIcons icon="user-round-plus">Follow</ButtonWithIcons>
        </div>
        <div className="h-12"/>
      </div>
    </section>
  )
}

function getCommonElement(fetchData: Artist | Collection): commonElement {
  return {
    id: fetchData.id,
    name: 'name' in fetchData ? fetchData.name : fetchData.title,
    image: "avatar" in fetchData ? fetchData.avatar : fetchData.cover,
    type: "name" in fetchData ? ElementType.Artist : ElementType.Collection,
    author: "author" in fetchData ? fetchData.author : null,
    songs: "songs" in fetchData ? fetchData.songs : []
  }
}

function randomHexColour() {return '#' + Math.random().toString(16).slice(2, 8)};