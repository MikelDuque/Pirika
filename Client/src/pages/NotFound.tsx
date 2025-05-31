import { useNavigate, useRouteError } from "react-router-dom"
import { Button } from "../components/ui/Button";
import { RouteError } from "../utils/types";

export default function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError() as RouteError;
  const errorMessage = error?.error?.message || error?.statusText || "Unknown error";

  return (
    <section className="size-full flex flex-col gap-10 justify-center items-center">
      <Button variant="ghost" icon="chevron-left" onClick={() => {navigate(-1)}}>Volver</Button>
      <img src="/Magic_book.gif" alt="Magic book" className="size-50"/>
      <div className="flex flex-col gap-3 items-center">
        <h1 className="super-title text-5xl">Oops! We didn't find spell for that!</h1>
        <h2 className="title text-gray-400">{errorMessage}</h2>
      </div>
    </section>
  )
}