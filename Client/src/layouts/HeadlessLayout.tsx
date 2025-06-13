import { Outlet } from "react-router-dom";

export default function HeadlessLayout() {
  return (
    <main className="size-full p-2 overflow-y-auto overflow-x-hidden">
      <Outlet/>
    </main>
  )
}