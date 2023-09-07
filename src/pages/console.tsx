import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import io, { Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@/types/socket";

import Terminal from "@/components/console/Terminal";
import { Get } from "@/services/ApiService";
import { DefaultEventsMap } from "@socket.io/component-emitter";

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

const Console = ({ Component, ...props }: AppProps) => {
  const [user, setUser] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    socket.emit("send", {
      user,
    });
  };

  const socketInitializer = async () => {
    await fetch("api/socket");
    socket = io();

    socket.on("receive", (message) => {
      console.log("🚀 ~ file: console.tsx:26 ~ socket.on ~ message:", message);
    });
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <main id="main-container">
      <input type="text" onChange={(e) => setUser(e.target.value)} />
      {user && (
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      )}
      {/* <Terminal /> */}
    </main>
  );
};

export default Console;
