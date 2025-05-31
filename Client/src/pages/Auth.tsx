import { useState } from "react"
import { Login, Register } from "../components/auth";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/Card/Card";

export default function Auth() {
  const navigate = useNavigate();
  const [changeAuth, setChangeAuth] = useState(false);

  const title = changeAuth ? "Sign up" : "Sign In";
  const footer = changeAuth ? "Already have an account?" : "No account yet?";

  function changeView() {setChangeAuth(prevState => !prevState)};

  return (
    <>
      <Button variant="ghost" icon="chevron-left" className="fixed top-2 left-2" onClick={() => {navigate(-1)}}>Go back</Button>
      <section className="size-full flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent>
            {changeAuth ? <Register/> : <Login/>}
          </CardContent>
          <CardFooter>
            {footer}
            <Button variant="link" onClick={changeView}>{changeAuth ? "Sign in!" : "Sign up!"}</Button>
          </CardFooter>
        </Card>
      </section>
    </>
  )
};