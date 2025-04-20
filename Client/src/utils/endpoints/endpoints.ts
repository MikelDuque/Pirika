export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/* --- FILES --- */
export function GET_FILE(url: string) {return `${API_BASE_URL}/${url}`};

/* --- AUTHORIZATION CONTROLLER --- */
const API_AUTH_URL = `${API_BASE_URL}/api/Auth`;

  export const LOGIN_URL = `${API_AUTH_URL}/Login`;
  export const REGISTER_URL = `${API_AUTH_URL}/Register`;

/* --- COLLECTION CONTROLLER --- */
const API_COLLECTION_URL = `${API_BASE_URL}/api/Collection`;

  
/* --- SONG CONTROLLER --- */
const API_SONG_URL = `${API_BASE_URL}/api/Song`;


/* --- TESTING URLS --- */

  export const GET_COLLECTIONS = `${API_COLLECTION_URL}/Get_Collections`;
  export const GET_SONGS = `${API_SONG_URL}/Get_Songs`;