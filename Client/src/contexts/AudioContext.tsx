import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Collection, Player, Song, TaskResult } from "../utils/types";
import { GET_COLLECTION, GET_FILE, GET_SONG } from "../utils/endpoints/endpoints";
import useFetch from "../utils/endpoints/useFetchEvent";
import {useFetch as fetchPrueba} from "../utils/endpoints/useFetch";
import { Crud } from "../utils/enums";
import { useAuth } from "./AuthContext";
import { Howl } from 'howler';

/* ---- TIPADOS ---- */
type AudioContextType = {
  queue: Song[],
  getPlayer: () => Howl,
  playerState?: Player,
  addToQueue: (id: number) => void,
  repeatSong: () => void,
  changeSong: (songId: number) => void
}

type AudioProviderProps = {
  children: ReactNode;
}

/* ----- DECLARACIÓN Context ----- */
const AudioContext = createContext<AudioContextType>({
  queue: [],
  getPlayer() {return new Howl({src: [GET_FILE("")]})},
  playerState: undefined,
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
  const {authData} = useAuth();
  const {fetchingData} = useFetch();
  const {fetchData} = fetchPrueba<TaskResult<Collection>>({
    url: GET_COLLECTION(1),
    type: Crud.GET,
    token: authData?.token,
    needAuth: true,
    condition: !!authData?.token
  });
  const [queue, setQueue] = useState<Song[]>([]);
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
    if(!queue.length) refreshFromStorage();
  }, []);

  useEffect(() => {
    if (!queue.length) return;

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
      onvolume() {player.current.volume() > 0 ?
        setPlayerState(prevState => ({
          ...prevState,
          volume: player.current.volume(),
          isMuted: false
        }))
        :
        setPlayerState(prevState => ({
          ...prevState,
          isMuted: true
        }))
      },
      onend() {
        !playerState.repeat &&
        setPlayerState(prevState => ({
          ...prevState,
          currentSong: prevState.currentSong +1
        }))
      }
    });

    return () => {if (player.current) player.current.unload()};
  }, [queue, playerState.currentSong]);

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
    const currentSong = songId > queue.length ? queue.length -1 : Math.max(0, songId);

    player.current.rate
    
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

  async function addToQueue(id: number, isCollection?: false) {
    const musicData = await fetchingData<Collection | Song>({
      url: isCollection ? GET_COLLECTION(id) : GET_SONG(id),
      type: Crud.GET,
      token: authData?.token,
      needAuth: true
    });

    if(musicData) {
      if('songs' in musicData) setQueue(prevState => (
        [...prevState, ...musicData.songs]
      ))
      else setQueue(prevState => (
        [...prevState, musicData]
      ))
    };
  };

  //PRUEBAS
  useEffect(() => {
    if(fetchData) {
      const collection = fetchData.result as Collection;
      
      setQueue(collection.songs || []);
    }
  }, [fetchData]);

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    queue,
    addToQueue,
    playerState,
    getPlayer,
    repeatSong,
    changeSong
  };

  return (<AudioContext.Provider value={contextValue}>{children}</AudioContext.Provider>);
}