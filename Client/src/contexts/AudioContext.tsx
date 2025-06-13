import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Collection, Player, Song } from "../utils/types";
import { GET_FILE } from "../utils/endpoints/endpoints";
import { Howl } from 'howler';

/* ---- TIPADOS ---- */
type AudioContextType = {
  playerState?: Player,
  queue: Song[]
  getPlayer: () => Howl,
  addToQueue: (element: Song | Collection) => void,
  repeatSong: () => void,
  changeSong: (songId: number) => void
}

type AudioProviderProps = {
  children: ReactNode;
}

/* ----- DECLARACIÓN Context ----- */
const AudioContext = createContext<AudioContextType>({
  playerState: undefined,
  queue: [],
  getPlayer() {return new Howl({src: [GET_FILE("")]})},
  addToQueue() {},
  repeatSong() {},
  changeSong() {}
});

export const useAudio = (): AudioContextType => {
  const context = useContext(AudioContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

/* ----- CUERPO Context ----- */
export function AudioProvider({ children }: AudioProviderProps) {
  // const {authData} = useAuth();
  // const {fetchingData} = useFetch();
  const [queue, setQueue] = useState<Song[]>([]);
  console.log("queue", queue);
  
  const [playerState, setPlayerState] = useState<Player>({
    currentSong: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 0.5,
    isMuted: false,
    repeat: false
  });
  const player = useRef<Howl>(new Howl({src: [""]}));

  useEffect(() => {
    if(queue.length <= 0) refreshFromStorage();
  }, []);

  useEffect(() => {
    if (queue.length <= 0) return;

    player.current = new Howl({
      src: [GET_FILE(queue[playerState.currentSong].path)],
      html5: true,
      autoplay: playerState.isPlaying,
      loop: playerState.repeat,
      volume: playerState.volume,
      onplay() {setPlayerState(prevState => ({
        ...prevState,
        isPlaying: true
      }))},
      onpause() {setPlayerState(prevState => ({
        ...prevState,
        isPlaying: false
      }))},
      onload() {setPlayerState(prevState => ({
        ...prevState,
        duration: player.current.duration()
      }))},
      onvolume() {
        setPlayerState(prevState => ({
          ...prevState,
          ...(player.current.volume() > 0 && {volume: player.current.volume()}),
          isMuted: false
        }))
      },
      onend() {
        if(!playerState.repeat) setPlayerState(prevState => ({
          ...prevState,
          currentSong: prevState.currentSong +1
        }))
      }
    });

    return () => {if (player.current) player.current.unload()};
  }, [queue]);

  // useEffect(() => {
  //   let interval: NodeJS.Timeout;

  //   if (playerState.isPlaying && player.current) {
  //     interval = setInterval(() => {
  //       setPlayerState(prevState => ({
  //         ...prevState,
  //         currentTime: player.current.seek()
  //       }))
  //     }, 1000);
  //   }

  //   return () => clearInterval(interval);
  // }, [playerState.isPlaying]);

  function getPlayer() {return player.current};

  function changeSong(songId: number) {
    const currentSong = songId >= queue.length ? queue.length -1 : Math.max(0, songId);

    // player.current.rate
    
    setPlayerState(prevState => ({
      ...prevState,
      currentSong
    }))
  }

  function repeatSong() {
    setPlayerState(prevState => ({
      ...prevState,
      repeat: !prevState.repeat
    }))

    player.current.loop(playerState.repeat)
  }

  function refreshFromStorage() {
    const storageQueue = localStorage.getItem("queue");

    if(storageQueue) setQueue(JSON.parse(storageQueue));
  };

  // async function addToQueue(id: number, isCollection?: false) {
  //   const musicData = await fetchingData<Collection | Song>({
  //     url: isCollection ? GET_COLLECTION(id) : GET_SONG(id),
  //     type: Crud.GET,
  //     token: authData?.token,
  //     needAuth: true
  //   });

  //   console.log("musicData", musicData);
    

  //   if(musicData) {
  //     if('songs' in musicData) setQueue(prevState => (
  //       [...prevState, ...musicData.songs]
  //     ))
  //     else setQueue(prevState => (
  //       [...prevState, musicData]
  //     ))
  //   };
  // };

  function addToQueue(element: Song | Collection) {
    if(element) {
      if('songs' in element) setQueue(prevState => (
        [...prevState, ...element.songs]
      ))
      else setQueue(prevState => (
        [...prevState, {...element}]
      ))
    };
  };

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    playerState,
    queue,
    addToQueue,
    getPlayer,
    repeatSong,
    changeSong
  };

  return (<AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>);
}