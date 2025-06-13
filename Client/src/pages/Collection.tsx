import { useParams } from "react-router-dom";
import { useFetch } from "../utils/endpoints/useFetch";
import { Collection as CollectionType, Song } from "../utils/types";
import { GET_COLLECTION, GET_SONG} from "../utils/endpoints/endpoints";
import ElementLayout from "../layouts/ElementLayout";
import useFetchEvent from "../utils/endpoints/useFetchEvent";
import { GenericCard } from "../components/GenericCard";
import { useAudio } from "../contexts";
import { musicMapper } from "../utils/mappers/elementMapper";
import { toast } from "sonner";

export default function Collection() {
  const {id} = useParams();
    const {getPlayer, addToQueue} = useAudio();

  const {fetchData: collection} = useFetch<CollectionType>({url: GET_COLLECTION(id!), condition: !!id});
  const {fetchingData} = useFetchEvent();

    console.log("collection", collection);

  function handleSaveButton() {
    
    toast("The collection was added to your library");
    //Terminar funcionalidad
  }

  async function handleSongClick(songId: number) {
    const song = await fetchingData<Song>({url: GET_SONG(songId)});
  
    if(song) {
      addToQueue(song);
      getPlayer().play();
    }
  }
  
  return (
    <ElementLayout element={musicMapper.toBasic(collection)} buttonClick={() => handleSaveButton()}>
      <ul className="w-full grid grid-cols-10 gap-3">
        {(collection && collection.songs.length > 0) && collection.songs.map((song, i) => (
            <li key={i} className="min-w-24">
              <GenericCard
                element={musicMapper.toBasic(song)}
                onClick={() => handleSongClick(song.id)}
              />
            </li>
        ))}
      </ul>
    </ElementLayout>
  )
}