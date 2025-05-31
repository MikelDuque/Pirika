import fetchEndpoint from "./fetchEndpoint";
import { FetchProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export function useFetch<T = unknown>({url, type, token, params, needAuth, condition}: FetchProps) {
  const {logOut} = useAuth();

  const [fetchData, setFetchData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Record<string, unknown> | unknown>(null);

  const fetchingData = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint({url, type, token, params, needAuth}) as T;    
      setFetchData(data);
      setFetchError(null);

      return data;

    } catch (error) {
      if(error === "Unauthorized") logOut();
      setFetchError(error);
      setFetchData(undefined)

    } finally {
      setIsLoading(false);
    }
  }, [url, type, token, params, needAuth, logOut]);

  useEffect(() => {
    if(typeof condition === "boolean" && condition === false) return; //Si la condicion es booleana (NO null o undefined), y esta es FALSA, retorna.
    fetchingData();

  }, [fetchingData, condition]);

  return ({
    fetchData,
    isLoading,
    fetchError
  });
};