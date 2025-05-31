import fetchEndpoint from "./fetchEndpoint";
import { FetchProps } from "../types";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function useFetch() {
  const {logOut} = useAuth();

  const [fetchData, setFetchData] = useState<unknown | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Record<string, unknown> | unknown>(null);

  async function fetchingData<T = unknown>({url, type, token, params, needAuth}: FetchProps) {
    try {
      setIsLoading(true);

      const data = await fetchEndpoint({url, type, token, params, needAuth}) as T;    
      setFetchData(data);
      setFetchError(null);

      return data;

    } catch (error) {
      if(error === "Unauthorized") logOut();
      setFetchError(error);

    } finally {
      setIsLoading(false);
    }
  };

  return ({
    fetchData,
    isLoading,
    fetchError,
    fetchingData
  });
};