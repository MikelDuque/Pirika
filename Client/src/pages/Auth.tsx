import { useState } from "react"
import { Login, Register } from "../components/auth";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  const [changeAuth, setChangeAuth] = useState(false);

  function changeView() {setChangeAuth(prevState => !prevState)};

  return (
    <>
      <Button icon="chevron-left" onClick={() => {navigate(-1)}}>Go back</Button>
      {changeAuth ? <Register/> : <Login/>}
      <Button onClick={changeView}>{changeAuth ? "Sign in!" : "Sign up!"}</Button>
    </>
  )
};