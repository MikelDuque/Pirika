import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthPath, HomePath, Index } from "../utils/paths";

export function SkipRoutes() {
  const {authData, skipIntro} = useAuth();
  const location = useLocation();

  if (authData) {
    if(location.pathname === Index && skipIntro() === false) return <Outlet/>;

    const previousPath = location.pathname === "" ? {HomePath} : location.pathname;
    return <Navigate to={HomePath} state={{page: previousPath}} replace/>
  }
  
  return <Outlet/>;
}

export function LoggedPrivateRoute() {
  const {authData} = useAuth();
  const location = useLocation();

  if(authData) return <Outlet/>

  const previousPath = location.pathname === "" ? Index : location.pathname;
  return <Navigate to={AuthPath} state={{page: previousPath}} replace/>
}

export function AdminPrivateRoute() {
  const {authData} = useAuth();
  const location = useLocation();
  
  if(!authData) {
    const previousPath = location.pathname === AuthPath ? Index : location.pathname;

    return <Navigate to={AuthPath} state={{page: previousPath}} replace/>
  }
  
  if(authData.decodedToken.role !== "admin") return(<Navigate to={Index} replace/>)

  return <Outlet/>
}