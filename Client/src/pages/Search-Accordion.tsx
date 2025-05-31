import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/Accordion";
import GenericCard from "../components/GenericCard";
import { useAudio } from "../contexts/AudioContext"
import { useAuth } from "../contexts/AuthContext";
import { SEARCH_URL } from "../utils/endpoints/endpoints";
import { useFetch } from "../utils/endpoints/useFetch";
import { Crud, ElementType } from "../utils/enums";
import { Artist, Collection, FilterResult, Song, TaskResult } from "../utils/types";

type ThisElementType = Artist | Song | Collection;

export default function Search() {
  const {authData} = useAuth();
  const {searchValue} = useAudio();
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
    function getTitle(element: Artist | Song | Collection) {
      return 'name' in element ? (element as Artist).name : (element as Song | Collection).title;
    }

    function getImg(element: Artist | Song | Collection) {
      return 'name' in element ? (element as Artist).avatar : (element as Song | Collection).cover;
    }

    function getType(element: ThisElementType) {
      if('name' in element) return ElementType.Artist;
      if('songs' in element) return ElementType.Collection;
      return ElementType.Song;
    }

    return (!!elements?.length &&
      <AccordionItem value={ElementType[getType(elements[0])]}>
        <AccordionTrigger>{ElementType[getType(elements[0])]}s</AccordionTrigger>
        <AccordionContent className="max-h-[30%] overflow-y-scroll">
          <ul className="h-full grid grid-cols-4 gap-2 ">
            {elements && elements.length > 0 && elements.map(element => (
              <li>
                <GenericCard title={getTitle(element) ?? ""} img={getImg(element) ?? ""} type={getType(element)}/>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      // <ul className="overflow-y-auto">
      //   {elements && elements.length > 0 && elements.map(element => (
      //     <li>
      //       <GenericCard title={getTitle(element) ?? ""} img={getImg(element) ?? ""} type={getType(element)}/>
      //     </li>
      //   ))}
      // </ul>
    )
  }

  return (
    <Accordion type="multiple" className="h-full">
      {printResult(filterResult?.artists)}
      {printResult(filterResult?.songs)}
      {printResult(filterResult?.collections)}
    </Accordion>
    // <div>
    //   {printResult(filterResult?.artists)}
    //   {printResult(filterResult?.songs)}
    //   {printResult(filterResult?.collections)}
    // </div>
  )
}