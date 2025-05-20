import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Player from "../components/Player";
import LibrarySidebar from "../components/LibrarySidebar";

export default function StandardLayout() {
  return (
    <div className="size-full min-h-screen max-h-screen grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_5fr] overflow-hidden">
      <LibrarySidebar className="row-span-2"/>
      <Header className="sticky top-0"/>
      <main className="overflow-y-auto" >
        <Outlet/>
      </main>
      <Player className="col-span-2"/>
    </div>

    // <div className="size-full min-h-screen max-h-screen grid grid-rows-[1fr_auto]">
    //   <main className="max-h-full grid grid-cols-[1fr_5fr]">
    //     <LibrarySidebar/>
    //     <section className="max-h-full grid grid-rows-[auto_1fr] px-3 [&>*]:py-3">
    //       <Header/>
    //       <Outlet />
    //     </section>
    //   </main>
    //   <Player/>
    // </div>
    
    // <div className="size-full min-h-screen grid grid-cols-[1fr_5fr]">
    //   <LibrarySidebar/>
    //   <main className="grid grid-rows-[auto_1fr_auto]">
    //     <Header/>
    //     <Outlet/>
    //     <Player/>
    //   </main>
    // </div>

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