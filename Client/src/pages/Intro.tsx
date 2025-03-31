import { useNavigate } from "react-router-dom";
import vinyl from "../assets/vinyl.svg";
import {Button} from "../components/ui/Button";
import { HomePath } from "../utils/paths";

export default function Intro() {
  const navigate = useNavigate();

  return (
    <>
      <figure className="size-full fixed -left-1/2 flex justify-center">
        <img src={vinyl} alt="vinyl vector" className="h-full object-contain"/>
      </figure>
      <div className="h-full w-5/7 fixed right-0 p-5 flex flex-col items-center justify-center gap-2">
        <h1 className="super-title">Pirika</h1>
        <h2 className="font-winky text-xl">Where music meets magic</h2>
        <Button onClick={() => {navigate(HomePath)}}>Hola</Button>
      </div>
    </>
  )
}