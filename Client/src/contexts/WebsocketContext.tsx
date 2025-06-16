import { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from "react";
import { WSMessage } from "../utils/types";
import { useAuth } from "./AuthContext";
import { WEBSOCKET_URL } from "../utils/endpoints/endpoints";

interface WebsocketContextType {
	socket: WebSocket | null;
	messages: Record<string, unknown>;
	sendMessage: <T>(message: WSMessage<T>) => void;
}

interface ReconnectRef {
	timer: NodeJS.Timeout | null
	isReconnecting: boolean
	attempts: number
}

/* ----- DECLARACIÓN Context ----- */
const WebsocketContext = createContext<WebsocketContextType>({
	socket: null,
	messages: {},
	sendMessage: () => {
		console.warn("Intentando enviar mensaje sin conexión WebSocket.");
	}
});

export const useWebsocket = (): WebsocketContextType => {
	const context = useContext(WebsocketContext);
	if (!context) throw new Error("El contexto debe usarse dentro del provider");
	return context;
};

/* ----- CUERPO del Context ----- */
export function WebsocketProvider({ children }: PropsWithChildren) {
	const { authData, logOut } = useAuth();

	const [messages, setMessages] = useState<Record<string, unknown>>({});
	const socket = useRef<WebSocket | null>(null);
	const {current: reconnection} = useRef<ReconnectRef>({timer: null, isReconnecting: false, attempts: 0})

	useEffect(() => {
		reconnection.isReconnecting = false;

		wsConnection();

		return () => {
			if (socket.current?.readyState === WebSocket.OPEN) {
				socket.current.close();
    		socket.current = null;
			};

			reconnection.isReconnecting = true;
			reconnection.attempts = 0;
			if(reconnection.timer) clearTimeout(reconnection.timer);
		};

	}, [authData?.token]);

	
	/* ----- WS Functions ----- */

	function wsConnection() {
		if (!authData?.token || socket.current){
			console.warn(!authData?.token ? "There's no security token yet" : "Websocket already active");
			return;
		};

		console.log("reconnection", reconnection);
		
		const ws = new WebSocket(WEBSOCKET_URL(authData!.token));
		console.log("Websocket conection created: ", ws);

		ws.onopen = () => {
			socket.current = ws;
			reconnection.attempts = 0;
			console.log("WebSocket connected (open): ", ws);
		};

		ws.onclose = (e) => {
			socket.current = null;
			console.log("WebSocket disconnected (closed): ", e.reason);

			console.log("reconnection", reconnection);

			if (!e.wasClean && !reconnection.timer && !reconnection.isReconnecting && reconnection.attempts < 5) {
				reconnection.timer = setTimeout(() => {
					console.log("Retrying websocket connection...");
					reconnection.timer = null;
					reconnection.attempts += 1;
					wsConnection();
				}, 5000)

			} else {
				//logOut();
			}
		};

		ws.onerror = (error) => {
			if (error instanceof Error) {
				console.error("There's have been an error with the websocket: ", error.message);
			} else {
				console.error("Unknown websocket error: ", error);
			}

			ws.close();
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data) as WSMessage;
			console.log("Websocket message received: ", message);

			setMessages(prevMessages => ({
				...prevMessages,
				[message.header]: message.body
			}));
		};
	}

	function sendMessage<T>(message: WSMessage<T>) {
		if (socket.current && socket.current.readyState === WebSocket.OPEN) {
			socket.current.send(JSON.stringify(message));
			console.log("Message send: ", message);

		} else {
			console.warn("There isn't any websocket connection active");
		}
	};

	/* ----- Fin Context ----- */
	const contextValue: WebsocketContextType = {
		socket: socket.current,
		messages,
		sendMessage,
	};

	return <WebsocketContext.Provider value={contextValue}>{children}</WebsocketContext.Provider>
};