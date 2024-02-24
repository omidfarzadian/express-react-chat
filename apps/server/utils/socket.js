const { IOEvent } = require('../models/socket.enum');
const { newMessage, getMessages } = require('./message');
const { userJoin, getUsersInRoom, userExit } = require('./user');

function joinChat(io, socket) {
  socket.on(IOEvent.JOIN_CHAT, async (newUser) => {
    const user = userJoin(newUser);

    await socket.join(user.room);
    await socket.emit(IOEvent.JOIN_CHAT, user);
    await io.to(user.room).emit(IOEvent.ROOM_USERS, {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
}

function emitRoomUsers(socket) {
  socket.on(IOEvent.ROOM_USERS, (room) => {
    socket.emit(IOEvent.ROOM_USERS, { room, users: getUsersInRoom(room) });
  });
}

function sendMessage(io, socket) {
  socket.on(IOEvent.SEND_MESSAGE, async (messageData) => {
    newMessage(messageData);
    await socket.join(messageData.audience);
    await io
      .to(messageData.audience)
      .emit(IOEvent.GET_MESSAGES, getMessages(messageData.audience));
  });
}

function emitMessages(socket) {
  socket.on(IOEvent.GET_MESSAGES, ({ audience }) => {
    socket.emit(IOEvent.GET_MESSAGES, getMessages(audience));
  });
}

function exitChat(io, socket) {
  socket.on(IOEvent.EXIT_CHAT, async (user) => {
    userExit(user);
    await socket.join(user.room);
    await io.to(user.room).emit(IOEvent.EXIT_CHAT, {
      users: getUsersInRoom(user.room),
    });
  });
}

module.exports = {
  joinChat,
  sendMessage,
  emitMessages,
  emitRoomUsers,
  exitChat,
};
