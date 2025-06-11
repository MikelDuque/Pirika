export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

/* --- FILES --- */
export function GET_FILE(url: string) {
  const fileRoute = API_BASE_URL.length > 0 ? "/" : "/files/";
  return API_BASE_URL + fileRoute + url
};

/* --- AUTHORIZATION CONTROLLER --- */
const API_AUTH_URL = `${API_BASE_URL}/api/Auth`;

  export const LOGIN_URL = `${API_AUTH_URL}/Login`;
  export const REGISTER_URL = `${API_AUTH_URL}/Register`;

/* --- MUSIC CONTROLLER --- */
const API_MUSIC_URL = `${API_BASE_URL}/api/Music`;
  export function GET_SONG(id: number) {return `${API_MUSIC_URL}/Get_Song/${id}`};
  export function GET_COLLECTION(id: number) {return `${API_MUSIC_URL}/Get_Collection/${id}`};
  export const SEARCH_URL = `${API_MUSIC_URL}/Search`

/* --- TESTING URLS --- */
  export const GET_COLLECTIONS = `${API_MUSIC_URL}/Get_Collections`;
  export const GET_SONGS = `${API_MUSIC_URL}/Get_Songs`;