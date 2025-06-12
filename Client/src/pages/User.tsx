import { useParams } from "react-router-dom";
import { useFetch } from "../utils/endpoints/useFetch";
import { Artist } from "../utils/types";
import { GET_FILE, GET_USER } from "../utils/endpoints/endpoints";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { getFirstChar } from "../utils/utils";
import ButtonWithIcons from "../components/ui/Button/ButtonWrapper";

export default function User() {
  const {id} = useParams();
  const {fetchData} = useFetch<Artist>({url: GET_USER(id || 0)});
  
  return (
    <section className="size-full flex flex-col">
      <div className="flex flex-col h-fit">
        <div className="flex flex-1 px-5 py-3 gap-5 justify-between items-end" style={{backgroundColor: randomHexColour()}}>
          <Avatar className="size-24 translate-y-1/2">
            <AvatarImage src={GET_FILE(fetchData?.avatar || "")}/>
            <AvatarFallback>{getFirstChar(fetchData?.name)}</AvatarFallback>
          </Avatar>
          <span className="w-full super-title">{fetchData?.name}</span>
          <ButtonWithIcons icon="user-round-plus">Follow</ButtonWithIcons>
        </div>
        <div className="h-12"/>
      </div>
      {/* <div className="h-1/8 w-full px-3 gap-5 items-end grid grid-cols-[auto_1fr_auto] grid-rows-2" style={{backgroundColor: randomHexColour()}}>
          <Avatar className="size-full aspect-square justify-self-center self-center translate-y-1/2">
            <AvatarImage src={GET_FILE(fetchData?.avatar || "")}/>
            <AvatarFallback>{getFirstChar(fetchData?.name)}</AvatarFallback>
          </Avatar>
        <span className="title text-5xl">{fetchData?.name}</span>
        <ButtonWithIcons>Seguir</ButtonWithIcons>
        <div className="col-span-full bg-black"/>
      </div> */}
      <div className="flex-1">
        Hola
      </div>
    </section>
  )
}

function randomHexColour() {return '#' + Math.random().toString(16).slice(2, 8)};