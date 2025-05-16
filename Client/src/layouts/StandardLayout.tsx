import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Player from "../components/Player";
import LibrarySidebar from "../components/LibrarySidebar";

export default function StandardLayout() {
  return (
    <div className="size-full min-h-screen grid grid-cols-[1fr_5fr]">
      <LibrarySidebar/>
      <main className="grid grid-rows-[auto_1fr_auto]">
        <Header/>
        <Outlet/>
        <Player/>
      </main>
    </div>

    // <div className="size-full min-h-screen grid grid-rows-[auto_1fr_auto] gap-2">
    //   <Header/>
    //   <main className="grid grid-cols-[1fr_5fr] gap-2">
    //     <LibrarySidebar/>
    //     <Outlet/>
    //   </main>
    //   <Player/>
    // </div>
  )
}