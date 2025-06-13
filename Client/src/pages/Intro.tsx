import { useNavigate } from "react-router-dom";
import vinyl from "../assets/vinyl.svg";
import logo from "../assets/logo.svg";
import {Button} from "../components/ui/Button";
import { HomePath } from "../utils/paths";
import { Checkbox, Label } from "../components/ui/Form";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Intro() {
  const navigate = useNavigate();
  const {skipIntro} = useAuth();
  const skipRef = useRef<HTMLButtonElement>(null);

  function enter() {
    const isChecked = skipRef.current?.ariaChecked;

    if(isChecked) localStorage.setItem("skip", isChecked);
    navigate(HomePath)
  }

  return (
    <>
      <figure className="size-full fixed -left-1/2 flex justify-center">
        <img src={vinyl} alt="vinyl vector" className="h-full object-contain"/>
      </figure>
      <div className="h-full w-5/7 fixed right-0 p-5 grid grid-rows-3 items-center">
        <div className="self-start flex flex-col gap-2 items-center">
          <h1 className="app-title">Pirika</h1>
          <h2 className="subtitle text-primary-darker dark:text-primary-lighter">Where music meets magic</h2>
        </div>
        
        <div className="flex flex-col items-center gap-5">
          <Button size="icon" variant="ghost" className="size-45" onClick={enter}>
            <img src={logo} className="animate-pulse active:animate-ping"/>
          </Button>
          <form className="flex gap-3">
            <Checkbox id="skip" ref={skipRef} defaultChecked={skipIntro()}/>
            <Label htmlFor="skip" className="details">Skip next time</Label>
          </form>
        </div>
      </div>
    </>
  )
}