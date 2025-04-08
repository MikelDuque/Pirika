import { createContext, ReactNode, useContext, useState } from "react";
import { AuthData } from "../utils/types";

/* ---- TIPADOS ---- */
type AuthContextType = {
  authData?: AuthData;
  logIn: () => void;
  logOut: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

/* ----- DECLARACIÓN Context ----- */
const AuthContext = createContext<AuthContextType>({
  logIn(){},
  logOut(){}
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [authData, setAuthData] = useState<AuthData>();

  function logIn(token: string, remember: boolean) {
    
  }

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    authData,
    logIn() {},
    logOut() {}
  };

  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};