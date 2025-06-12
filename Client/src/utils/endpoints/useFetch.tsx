import fetchEndpoint from "./fetchEndpoint";
import { FetchProps } from "../types";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Crud } from "../enums";

export function useFetch<T = unknown>(props: FetchProps) {
  const {authData, logOut} = useAuth();
  
  const [fetchData, setFetchData] = useState<T | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Record<string, unknown> | unknown>(null);

  const {url, params, condition, type = Crud.GET} = props;

  const fetchingData = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint({url, type, token: authData?.token, params}) as T;    
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
  }, [url, type, authData, params, logOut]);

  useEffect(() => {
    if (condition === false) return;
    fetchingData();

  }, [fetchingData, condition]);

  return ({
    fetchData,
    isLoading,
    fetchError
  });
};