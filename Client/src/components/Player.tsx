import { Slider } from "./ui/Form";
import { Button } from "./ui/Button";
import { useAudio } from "../contexts/AudioContext";
import { useEffect, useState } from "react";
import { cn } from "../utils/utils";

export default function Player({className}: {className?: string}) {
  const {getPlayer, playerState, repeatSong, changeSong} = useAudio();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
      let interval: NodeJS.Timeout;
  
      if (playerState?.isPlaying && getPlayer()) interval = setInterval(() => {setCurrentTime(getPlayer().seek())}, 1000);
  
      return () => clearInterval(interval);
    }, [playerState?.isPlaying]);
  

  function formatTime(seconds: number): string {
    return new Date(seconds * 1000).toLocaleTimeString('es-ES', {
      minute: '2-digit',
      second: '2-digit'
    });
  }
  
  return (
    <footer className={cn(className, "w-full h-25 bg-gray-200/20 flex flex-col gap-2 items-center justify-center backdrop-blur-sm shadow")}>
      <div className="w-1/3 grid grid-cols-3">
        <Button
          icon={playerState?.repeat ? "refresh-cw" : "refresh-cw-off"}
          size="icon"
          variant="ghost"
          onClick={repeatSong}
        />
        <div className="flex gap-5 place-self-center">
          <Button
            icon="skip-back"
            size="icon"
            variant="ghost"
            onClick={() => changeSong(playerState ? playerState?.currentSong -1 : 0)}
          />
          <Button
            icon={playerState?.isPlaying ? "pause" : "play"}
            size="icon"
            variant="ghost"
            onClick={() => playerState?.isPlaying ? getPlayer().pause() : getPlayer().play()}
          />
          <Button
            icon="skip-forward"
            size="icon"
            variant="ghost"
            onClick={() => changeSong(playerState ? playerState?.currentSong +1 : 0)}
          />
        </div>
        <div className="w-full flex gap-2 items-center justify-end place-self-end">
          <Button
            icon={!playerState?.isMuted ? "volume-2" : "volume-off"}
            size="icon"
            variant="ghost"
            onClick={() => !playerState?.isMuted ? getPlayer().volume(0) : getPlayer().volume(playerState?.volume || 0.5)}
          />
          <Slider
            className="w-1/2"
            max={1}
            step={0.01}
            value={[playerState?.volume || 0.5]}
            onValueChange={([newVolume]) => getPlayer().volume(newVolume)}
          />
        </div>
      </div>
      <div className="w-1/3 flex gap-2">
        <span>{formatTime(currentTime)}</span>
        <Slider
          max={playerState?.duration || 0}
          step={1}
          value={[currentTime]}
          onValueChange={([newTime]) => getPlayer().seek(newTime)}
        />
        <span>{formatTime(playerState?.duration || 0)}</span>
      </div>
    </footer>
  )
}