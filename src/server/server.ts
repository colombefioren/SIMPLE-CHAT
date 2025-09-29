import next from "next";
import { createServer } from "node:http";
import { Server } from "socket.io";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const app = next({ hostname, dev, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handler);
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });

  server.on("error", (error) => {
    console.error(error);
    process.exit(1);
  });
});
