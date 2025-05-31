import { Crud } from "../enums";
import { FetchProps } from "../types";

export default async function fetchEndpoint({url, type, token, params, needAuth} : FetchProps) {
  console.log(`PETICION: URL: ${url}, tipo: ${type}, token: ${token}, needAuth: ${needAuth}`);
  console.log("params stringtify", params);  
  
  const response = (token && needAuth) ?
    await defineFetch({url, type, token, params}).then((response) => {if(response.status !== 401){return response} throw "Unauthorized"}) :
    await defineFetch({url, type, token, params});

  const jsonResponse = await response.json();

  if (response.ok) return jsonResponse;
  
  throw jsonResponse.message;
};

/* ------------------------- */

async function defineFetch({url, type, token, params} : FetchProps) {

  if(type !== Crud.GET && params instanceof FormData) return (
    await fetch(url, {
      method: type.toString(),
      body: params
  }));
  
  if(type !== Crud.GET && params) return (
    await fetch(url, {
      method: type.toString(),
      headers: printHeaders(token),
      body: JSON.stringify(params)
  }));

  return await fetch(url, {headers: printHeaders(token)});
}

function printHeaders(token : string | unknown) : {[key : string] : string} {
  if(!token) return {'Content-Type': 'application/json'};

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }; 
}