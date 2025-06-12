import { Outlet } from "react-router-dom";
import { NavProvider } from "../contexts";

export default function Layout() {
  return (
    <NavProvider>
      <Outlet/>
    </NavProvider>
  )
}