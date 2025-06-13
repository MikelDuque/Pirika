import {Button} from "../components/ui/Button";
import { ElementType } from "../utils/enums";
import { PropsWithChildren } from "react";
import { BasicElement } from "../utils/types";
import { AvatarWrapper } from "../components/ui/Avatar";
import { useAuth } from "../contexts";

type ElementLayoutType = PropsWithChildren & {
  element?: BasicElement,
  buttonClick: (id?: number | string) => void
};

export default function ElementLayout({element, buttonClick, children}: ElementLayoutType) {
  const {authData} = useAuth();
  const isArtist = element?.type === ElementType.Artist;
  const [firstOne, ...followOnes] = element?.subElements || [];

  return (
    <section className="size-full flex flex-col">
      <div className="flex flex-col h-fit">
        <div className="flex flex-1 px-5 py-3 gap-5 justify-between items-end" style={{backgroundColor: randomHexColour()}}>
          <AvatarWrapper element={element} className="size-24 translate-y-1/2"/>
          <div className="w-full flex flex-col gap-2">
            <span className="super-title">{element?.name}</span>
            <p>
              {firstOne && <span>{firstOne.name}</span>}
              {followOnes.length > 0 && 
                <span className="text-foreground/75 dark:text-dark-foreground/75">
                  , {followOnes.map(thisElement => thisElement.name).join(", ")}
                </span>
              }
            </p>
          </div>
          {!(isArtist && element.id === authData?.decodedToken.id) &&
            <Button size="icon" icon={isArtist ? "user-round-plus" : "heart"} onClick={() => buttonClick(element?.id)}/>
          }
        </div>

        <div className="h-12"/>

        <div>
          {children}
        </div>
      </div>
    </section>
  )
}

function randomHexColour() {return '#' + Math.random().toString(16).slice(2, 8)};