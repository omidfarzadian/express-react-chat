const { IOEvent } = require('./models/socket.enum');
const {
  socketConnection,
  emitUsersInRoom,
  joinChat,
  sendMessage,
  emitMessages,
  emitRoomUsers,
  exitChat,
} = require('./utils/socket');

require('dotenv').config();
const port = process.env.PORT;

const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express().use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on(IOEvent.CONNECTION, async (socket) => {
  joinChat(io, socket);
  emitRoomUsers(socket);
  sendMessage(io, socket);
  emitMessages(socket);
  exitChat(io, socket);
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
