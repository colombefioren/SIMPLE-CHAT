import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { ChatMember } from "./types/chat";
import prisma from "./lib/db/prisma";
import { RoomMember } from "./types/room";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const app = next({ hostname, dev, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handler);

  const io = new Server(server, {
    cors: {
      origin: `http://${hostname}:${port}`,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("setup", (userId) => {
      socket.join(`user:${userId}`);
    });

    socket.on("create-chat", (chat) => {
      chat.members.forEach((member: ChatMember) => {
        socket.join(`chat:${chat.id}`);
        io.to(`user:${member.user.id}`).emit("open-chat", chat);
      });
    });
    socket.on("join-chat", (chatId) => {
      console.log("You joined chat", chatId);
      socket.join(`chat:${chatId}`);
    });

    socket.on("send-message", (message) => {
      io.to(`chat:${message.chatId}`).emit("receive-message", message);
      prisma.message
        .create({
          data: {
            chatId: message.chatId,
            senderId: message.senderId,
            content: message.content,
          },
        })
        .catch((error) => console.error(error));
    });

    socket.on("create-room", (room) => {
      room.members.forEach((member: RoomMember) => {
        console.log("Room created for ", member.user.id);
        io.to(`user:${member.user.id}`).emit("new-room", room);
      });
    });

    socket.on("join-room", (roomId) => {
      console.log("You joined room", roomId);
      socket.join(`room:${roomId}`);
    });

    socket.on("update-video-state", (videoState) => {
      io.to(`room:${videoState.roomId}`).emit("new-video-state", videoState);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });

  server.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
});
