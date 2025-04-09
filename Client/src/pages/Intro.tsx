import { useNavigate } from "react-router-dom";
import vinyl from "../assets/vinyl.svg";
import {Button} from "../components/ui/Button";
import { HomePath } from "../utils/paths";
import { Checkbox, Label } from "../components/ui/Form";
import { useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Intro() {
  const navigate = useNavigate();
  const {authData, skipIntro} = useAuth();
  const skipRef = useRef<HTMLButtonElement>(null);

  // useEffect(() => {
  //   const skip = isChecked();

  //   console.log("puedo?", skip && authData);
    
  //   if(skip && authData) navigate(HomePath);
  // }, [authData]);

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
      <div className="h-full w-5/7 fixed right-0 p-5 flex flex-col items-center justify-center gap-2">
        <h1 className="super-title">Pirika</h1>
        <h2 className="font-winky text-xl">Where music meets magic</h2>
        <Button onClick={enter}>Continue</Button>
        <div className="flex gap-1">
          <Checkbox id="skip" ref={skipRef} defaultChecked={skipIntro()}/>
          <Label htmlFor="skip">Skip this page the next time you log in</Label>
        </div>
      </div>
    </>
  )
}