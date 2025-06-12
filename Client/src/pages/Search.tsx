import { useNavigate } from "react-router-dom";
import GenericCard from "../components/GenericCard";
import { useAudio } from "../contexts/AudioContext"
import { SEARCH_URL } from "../utils/endpoints/endpoints";
import { useFetch } from "../utils/endpoints/useFetch";
import { Crud, ElementType } from "../utils/enums";
import { Artist, Collection, BasicElement, Song } from "../utils/types";
import { printPathWithId } from "../utils/paths";
import { useNav } from "../contexts";

type ThisElementType = Artist | Song | Collection;

export default function Search() {
  const {addTab} = useNav();
  const navigate = useNavigate();
  const {getPlayer, addToQueue} = useAudio();
  const {searchFilter} = useNav();
  const {fetchData: filterResult} = useFetch<BasicElement[]>({
    url: SEARCH_URL,
    type: Crud.POST,
    params: searchFilter
  });

  function printResult(elements?: ThisElementType[]) {
    function getTitle(element: ThisElementType) {
      return 'name' in element ? element.name : element.title;
    }

    function getArtist(element: ThisElementType) {
      return 'author' in element ? element.author : undefined;
    }

    function getImg(element: ThisElementType) {
      return 'name' in element ? element.avatar : element.cover;
    }

    function getType(element: ThisElementType) {
      if('name' in element) return ElementType.Artist;
      if('songs' in element) return ElementType.Collection;
      return ElementType.Song;
    }

    function onCardClick(element: ThisElementType) {
      switch(getType(element)) {
        case ElementType.Artist:
          return navigate(printPathWithId("User", element.id))
        case ElementType.Collection:
          return navigate(printPathWithId("Collection", element.id))
        case ElementType.Song:
          return addToQueue(element as Song), getPlayer().play();;
      }
    }

    return (!!elements?.length &&
      elements && elements.length > 0 && elements.map(element => (
        <li>
          <GenericCard
            title={getTitle(element) ?? ""}
            author={getArtist(element)}
            img={getImg(element) ?? ""}
            type={getType(element)}
            className="w-full cursor-pointer"
            onClick={() => onCardClick(element)}
          />
        </li>
      ))
    )
  }

  function newPrintResult() {
    function onCardClick(element: BasicElement) {
      switch(element.type) {
        case ElementType.Artist:
          return addTab("User", element)
        case ElementType.Collection:
          return addTab("Collection", element)
        case ElementType.Song:
          return console.log("cancion");
      }
    }

    return (!!filterResult?.length &&
      filterResult && filterResult.length > 0 && filterResult.map((element, i) => (
        <li key={i}>
          <GenericCard
            title={element.name}
            img={element.image}
            type={element.type}
            className="w-full cursor-pointer"
            onClick={() => onCardClick(element)}
          />
        </li>
      ))
    )
  }

  return (
    <ul className="h-full grid grid-cols-7 gap-3 overflow-auto">
      {/* {filterResult?.map(item => (
        console.log(GET_FILE(item.image)),
        
        <li key={item.id}>
          <span>{item.name}</span>
          <img src={GET_FILE(item.image)}/>
        </li>
      ))} */}
      {newPrintResult()}
    </ul>
    // <div>
    //   {printResult(filterResult?.artists)}
    //   {printResult(filterResult?.songs)}
    //   {printResult(filterResult?.collections)}
    // </div>
  )
}