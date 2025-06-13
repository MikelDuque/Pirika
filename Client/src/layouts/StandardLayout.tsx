import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Player from "../components/Player";
import LibrarySidebar from "../components/LibrarySidebar";
import { SidebarProvider } from "../components/ui/Sidebar";
import { AudioProvider, NavProvider } from "../contexts";

export default function StandardLayout() {
  return (
    <NavProvider>
      <AudioProvider>
        <SidebarProvider>
          <div className="size-full grid grid-rows-[auto_1fr_auto] grid-cols-[1fr_5fr] overflow-hidden">
            <LibrarySidebar className="row-span-2"/>
            <Header className="sticky top-0 p-2"/>
            <main className="h-full p-2 overflow-y-auto overflow-x-hidden">
              <Outlet/>
            </main>
            <Player className="col-span-2"/>
          </div>
        </SidebarProvider>
      </AudioProvider>
    </NavProvider>
  )
}