import { Outlet } from "react-router-dom";

export default function HeadlessLayout() {
  return (
    <main className="size-full">
      <Outlet/>
    </main>
  )
}