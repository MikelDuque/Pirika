export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
export const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL ?? "";

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
  export const SEARCH_URL = `${API_MUSIC_URL}/Search`;
  export const PUBLISH_URL = `${API_MUSIC_URL}/Publish`;
  export function GET_SONG(id: number | string) {return `${API_MUSIC_URL}/Get_Song/${id}`};
  export function GET_COLLECTION(id: number | string) {return `${API_MUSIC_URL}/Get_Collection/${id}`};

/* --- USER CONTROLLER --- */
const API_USER_URL = `${API_BASE_URL}/api/User`;
  export function GET_USER(id: number | string) {return `${API_USER_URL}/Get_User/${id}`};
  export const GET_ARTISTS_BY_NAME = `${API_USER_URL}/Get_Artists_By_Name`;
  export const POST_FOLLOW_ARTIST = `${API_USER_URL}/Follow_Artist`;

/* --- WEBSOCKET CONTROLLER --- */
export function WEBSOCKET_URL(token: string) {return `${WS_BASE_URL}/Websocket?accessToken=${token}`};