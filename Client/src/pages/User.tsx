import { useParams } from "react-router-dom";
import { useFetch } from "../utils/endpoints/useFetch";
import { Artist, Request } from "../utils/types";
import { GET_USER, POST_FOLLOW_ARTIST } from "../utils/endpoints/endpoints";
import ElementLayout from "../layouts/ElementLayout";
import { artistMapper } from "../utils/mappers/elementMapper";
import useFetchEvent from "../utils/endpoints/useFetchEvent";
import { Crud } from "../utils/enums";

import { useNav } from "../contexts";
import { GenericCard } from "../components/GenericCard";
import { toast } from "sonner"

export default function User() {
  const {id} = useParams();
  const {openTab} = useNav();

  const {fetchData: artist} = useFetch<Artist>({url: GET_USER(id!), condition: !!id});
  const {fetchingData} = useFetchEvent();

  async function handleButtonClick(targetId?: number | string) {
    if(!targetId || !id) return;

    const followRequest: Request = {
      senderId: id,
      targetId: targetId
    }

    const isFollowed = await fetchingData({url:POST_FOLLOW_ARTIST, type:Crud.POST, params:followRequest});

    if(isFollowed) toast("You have followed " + artist?.name);
  }
  
  return (
    <ElementLayout element={artistMapper.toBasic(artist)} buttonClick={handleButtonClick}>
      <ul className="w-full grid grid-cols-10 gap-3">
        {(artist && artist.music.length > 0) && artist.music.map((element, i) => (
            <li key={i} className="min-w-24">
              <GenericCard
                element={element}
                onClick={() => openTab("Collection", element)}
              />
            </li>
        ))}
      </ul>
    </ElementLayout>
  )
}