import { createContext, ReactNode, useContext } from "react";
import { DecodedToken } from "../utils/types";

/* ---- TIPADOS ---- */
type AuthContextType = {
  token: string | undefined;
  // decodedToken: DecodedToken;
  logIn: () => void;
  logOut: () => void;
}

type AuthProviderProps = {
  children: ReactNode;
}

/* ----- DECLARACIÓN Context ----- */
const AuthContext = createContext<AuthContextType>({
  token:undefined,
  // decodedToken:undefined,
  logIn(){},
  logOut(){}
});

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

export function AuthProvider({ children }: AuthProviderProps) {

  /* ----- FINAL DEL CONTEXTO ----- */

  const contextValue = {
    token: "",
    decodedToken: "",
    logIn() {},
    logOut() {}
  };

  return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>);
};