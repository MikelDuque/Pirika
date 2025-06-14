import { Crud } from "../enums";
import { FetchFunction } from "../types";

export default async function fetchEndpoint(props : FetchFunction) {
  console.log(`PETICION: URL: ${props.url}, tipo: ${props.type || Crud.GET}, token: ${props.token}`);
  console.log("params stringtify", props.params);  
  
  const response = await defineFetch(props).then((response) => {if(response.status !== 401){return response} throw "Unauthorized"});

  const jsonResponse = await response.json();

  console.log("response", jsonResponse);  

  if (response.ok) return jsonResponse;
  
  throw jsonResponse.message;
};

/* ------------------------- */

async function defineFetch({url, type, token, params} : FetchFunction) {
  const isForm = params instanceof FormData;
  console.log("isForm?", isForm);
  

  const aVer: RequestInit = {
    method: type,
    headers: getHeaders(isForm, token),
    body: !isForm && params ? JSON.stringify(params) : params
  };

  return await fetch(url, aVer);
}

function getHeaders(isForm: boolean, token?: string): HeadersInit | undefined {
  const headers: Record<string, string> = {};

  if (token) headers['Authorization'] = `Bearer ${token}`;
  if (!isForm) headers['Content-Type'] = 'application/json';

  return Object.keys(headers).length > 0 ? headers : undefined;
}