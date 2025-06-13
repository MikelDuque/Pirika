
import { useAudio } from "../contexts/AudioContext"
import { GET_SONG, SEARCH_URL } from "../utils/endpoints/endpoints";
import { useFetch } from "../utils/endpoints/useFetch";
import useFetchEvent from "../utils/endpoints/useFetchEvent";
import { Crud, ElementType } from "../utils/enums";
import { BasicElement, Song,} from "../utils/types";
import { useNav } from "../contexts";
import { GenericCard } from "../components/GenericCard";

export default function Search() {
  const {fetchingData} = useFetchEvent();
  const {openTab} = useNav();
  const {getPlayer, addToQueue} = useAudio();
  const {searchFilter} = useNav();
  const {fetchData: filterResult} = useFetch<BasicElement[]>({
    url: SEARCH_URL,
    type: Crud.POST,
    params: searchFilter
  });

  async function onSongClick(id: number) {
    const song = await fetchingData<Song>({url: GET_SONG(id)});

    if(song) addToQueue(song), getPlayer().play();
  }

  function onCardClick(element: BasicElement) {
      switch(element.type) {
        case ElementType.Artist:
          return openTab("User", element)
        case ElementType.Collection:
          return openTab("Collection", element)
        case ElementType.Song:
          return onSongClick(element.id);
      }
    }

  return (
    <ul className="w-full grid grid-cols-5 gap-3 lg:grid-cols-7 xl:grid-cols-10">
      {(filterResult && filterResult.length > 0) && filterResult.map((element, i) => (
          <li key={i} className="min-w-24">
            <GenericCard
              element={element}
              onClick={() => onCardClick(element)}
            />
          </li>
      ))}
    </ul>
  )
}