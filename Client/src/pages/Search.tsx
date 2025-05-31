import { useNavigate } from "react-router-dom";
import GenericCard from "../components/GenericCard";
import { useAudio } from "../contexts/AudioContext"
import { useAuth } from "../contexts/AuthContext";
import { SEARCH_URL } from "../utils/endpoints/endpoints";
import { useFetch } from "../utils/endpoints/useFetch";
import { Crud, ElementType } from "../utils/enums";
import { Artist, Collection, FilterResult, Song, TaskResult } from "../utils/types";
import { ThisCollectionPath, ThisProfilePath } from "../utils/paths";

type ThisElementType = Artist | Song | Collection;

export default function Search() {
  const navigate = useNavigate();
  const {authData} = useAuth();
  const {getPlayer, searchValue, addToQueue} = useAudio();
  const {fetchData} = useFetch<TaskResult<FilterResult>>({
    url: SEARCH_URL,
    type: Crud.POST,
    token: authData?.token,
    params: searchValue,
    needAuth: true,
    condition: !!authData?.token
  });
  const filterResult = fetchData?.result;

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
          console.log("prof path", ThisProfilePath(element.id));
          
          return navigate(ThisProfilePath(element.id))
        case ElementType.Collection:
          return navigate(ThisCollectionPath(element.id))
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

  return (
    <ul className="h-full grid grid-cols-7 gap-3 overflow-auto">
      {printResult(filterResult?.artists)}
      {printResult(filterResult?.songs)}
      {printResult(filterResult?.collections)}
    </ul>
    // <div>
    //   {printResult(filterResult?.artists)}
    //   {printResult(filterResult?.songs)}
    //   {printResult(filterResult?.collections)}
    // </div>
  )
}