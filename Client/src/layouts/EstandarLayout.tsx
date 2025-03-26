import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function StandardLayout() {
  return (
    <>
      <Header/>
      <main><Outlet/></main>
      <Footer/>
    </>
  )
}