import { Server } from "socket.io";
import type { NextApiRequest } from "next";
import type {
  NextApiResponseWithSocket,
  ServerToClientEvents,
  ClientToServerEvents,
} from "@/types/socket";

export const config = {
  api: {
    bodyParser: false,
  },
};

const ioHandler = (req: NextApiRequest, res: NextApiResponseWithSocket) => {
  try {
    if (!res.socket.server.io) {
      const io = new Server(res.socket.server);
      res.socket.server.io = io;
  
      io.on("connection", (socket) => {
        console.log("🚀 Socket.io ===> Connected!", socket.id);

        socket.on("send", (message) => {
          console.log("🚀 Socket.io ===> message!", socket.id, message);
          io.emit("receive", message);
        });

        socket.on("disconnect", () => {
          console.log("🚀 Socket.io ===> Disconnect!", socket.id);
        });
      });
  
      res.socket.server.io = io;
    } else {
      console.log("🚀 Socket.io ===> It's already running!");
    }
    res.end();
  } catch (error) {
    console.error("🚀 ~ file: index.ts:40 ~ ioHandler ~ error:", error)
    res.status(400).json(error);
  }
};

export default ioHandler;
