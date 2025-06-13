"use client";

import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { useWebsocket } from "./WebsocketContext";
import { NewRelease } from "../utils/types";

/* ---- TIPADOS ---- */
interface NotificationContextType {
  notifications: string[];
  addNotification: (newNotification: string) => void
}

/* ----- DECLARACIÓN Context ----- */
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  addNotification: () => {}
});

export function useNotification(): NotificationContextType {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("El contexto debe usarse dentro del provider");
  return context;
};

/* ----- CUERPO del Context ----- */
export function NotificationProvider({children}: PropsWithChildren) {
  const {messages} = useWebsocket();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    filterMessages();
  }, [messages])

  useEffect(() => {
    if (notifications.length <= 0) return;
    toast(notifications.slice(-1)[0]);
    
  }, [notifications])

  function addNotification(newNotification: string) {
    setNotifications(prevState => 
      [...prevState,
      newNotification]
    );
  }

  function filterMessages() {
    const newRelease = messages["MusicRelease"] as NewRelease;

    if (newRelease){
      const notification = `${newRelease.author} just realeases their new album: ${newRelease.title}!`;
      addNotification(notification);
    } 
  }

  /* ----- Fin Context ----- */
  const contextValue: NotificationContextType = {
    notifications,
    addNotification
  };

  return <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
};