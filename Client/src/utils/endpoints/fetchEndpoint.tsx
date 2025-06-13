import { Crud } from "../enums";

interface FetchingProps {
  url: string;
  type: Crud;
  token?: string;
  params?: BodyInit | object;
}

export default async function fetchEndpoint({url, type, token, params} : FetchingProps) {
  console.log(`PETICION: URL: ${url}, tipo: ${type}, token: ${token}`);
  console.log("params stringtify", params);  
  
  const response = await defineFetch({url, type, token, params}).then((response) => {if(response.status !== 401){return response} throw "Unauthorized"});

  const jsonResponse = await response.json();

  console.log("response", jsonResponse);  

  if (response.ok) return jsonResponse;
  
  throw jsonResponse.message;
};

/* ------------------------- */

async function defineFetch({url, type, token, params} : FetchingProps) {

  if(type !== Crud.GET && params instanceof FormData) return (
    await fetch(url, {
      method: type.toString(),
      headers: printHeaders(token),
      body: params
    })
  );
  
  if(type !== Crud.GET && params) return (
    await fetch(url, {
      method: type.toString(),
      headers: printHeaders(token),
      body: JSON.stringify(params)
    })
  );

  return await fetch(url, {headers: printHeaders(token)});
}

function printHeaders(token?: string) : {[key : string] : string} {
  if(!token) return {'Content-Type': 'application/json'};

  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }; 
}