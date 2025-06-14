import fetchEndpoint from "./fetchEndpoint";
import { FetchHook } from "../types";
import { useAuth } from "../../contexts/AuthContext";
import { Crud } from "../enums";

export default function useFetchEvent() {
  const {authData, logOut} = useAuth();

  async function fetchingData<T = unknown>(props: FetchHook) {
    const {url, params, type = Crud.GET} = props;

    try {
      const data = await fetchEndpoint({url, type, token: authData?.token, params}) as T;    
      return data;

    } catch (error) {
      if(error === "Unauthorized") logOut();
    }
  };

  return {fetchingData}

};