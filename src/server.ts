//imports
import express from "express";
import socket from "socket.io";
import path from "path";
//server setup
const app = express();
const port: any = process.env.PORT;

//static
app.use(express.static("public"));

const server = app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}`);
});

let io = socket(server);

io.on("connect", socket => {
  console.log("Websocket connection established");

  socket.on("chat", data => {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", data => {
    socket.broadcast.emit("typing", data);
  });
});
