import vinyl from "../assets/vinyl.svg";
import Button from "../components/ui/Button";

export default function Intro() {
  return (
      <section className="size-full">
        <aside className="absolute h-full -translate-x-1/2">
          <img src={vinyl} alt="vinyl vector" className="object-contain size-full"/>
        </aside>
        <div className="absolute w-2/3 right-0 flex flex-col items-center">
          <h1 className="super-title">Pirika</h1>
          <h2 className="font-winky text-xl">Where music meets magic</h2>
        </div>
        <Button>
          Hola
        </Button>
      </section>
  )
}