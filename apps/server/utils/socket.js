const { IOEvent, IOResponse } = require('../models/socket.enum');
const { newMessage, getMessages } = require('./message');
const { loginUser, getUsersInRoom } = require('./user');

function socketConnection(socket) {
  // console.log('User connected. SocketID:', socket.id);
}

function joinChat(socket) {
  //TODO: Refactor socket.js and maybe implement another approach
  socket.on(IOEvent.LOGIN, (user) => {
    const errorMessage = loginUser(user);
    if (errorMessage) {
      socket.emit(IOResponse.LOGIN_FAILURE, { message });
      return;
    }

    socket.emit(IOResponse.LOGIN_SUCCESS, user)
    socket.emit(IOEvent.ROOM_USERS, {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });
}

function emitUsersInRoom(socket) {
  socket.on(IOEvent.ROOM_USERS, (room) => {
    socket.emit(IOEvent.ROOM_USERS, { room, users: getUsersInRoom(room) });
  });
}

function sendMessage(socket) {
  socket.on(IOEvent.SEND_MESSAGE, (messageData) => {
    newMessage(messageData);
    socket.emit(
      IOEvent.GET_MESSAGES,
      getMessages(messageData.user, messageData.audience),
    );
  });
}

function emitMessages(socket) {
  socket.on(IOEvent.GET_MESSAGES, ({ user, audience }) => {
    socket.emit(IOEvent.GET_MESSAGES, getMessages(user, audience));
  });
}

module.exports = {
  socketConnection,
  joinChat,
  emitUsersInRoom,
  sendMessage,
  emitMessages,
};
