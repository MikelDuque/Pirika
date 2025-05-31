import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AuthData, DecodedToken } from "../utils/types";
import {jwtDecode} from "jwt-decode";

/* ---- TIPADOS ---- */
type AuthContextType = {
  authData?: AuthData;
  logIn: (token: string, remember: boolean) => void;
  logOut: () => void;
  skipIntro: () => boolean
}

type AuthProviderProps = {
  children: ReactNode;
}

/* ----- DECLARACIÓN Context ----- */
const AuthContext = createContext<AuthContextType>({
  logIn(){},
  logOut(){},
  skipIntro() {return false}
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authData, setAuthData] = useState<AuthData>();

  useEffect(() => {
    if(!authData) refreshFromStorage();
  }, []);

  function refreshFromStorage() {
    const storageToken = localStorage.getItem("token") || sessionStorage.getItem("token");

    if(storageToken) setAuthData({
        token: storageToken,
        decodedToken: jwtDecode<DecodedToken>(storageToken)
      });
  };

  function logIn(token: string, remember: boolean) {
    remember ? localStorage.setItem("token", token) : sessionStorage.setItem("token", token);

    setAuthData({
      token: token,
      decodedToken: jwtDecode<DecodedToken>(token)
    });
  };

  function logOut() {
    setAuthData(undefined);
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  };

  function skipIntro() {
    const localSkip = JSON.parse(localStorage.getItem("skip") || "false") as boolean;
    const sessionSkip = JSON.parse(sessionStorage.getItem("skip") || "false") as boolean;

    return localSkip || sessionSkip;
  }

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    authData,
    logIn,
    logOut,
    skipIntro
  };

  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};