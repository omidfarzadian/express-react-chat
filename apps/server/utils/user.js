const { v4: uuidv4 } = require('uuid');

const users = [];

function userJoin(newUser) {
  const user = {
    id: uuidv4(),
    ...newUser,
  };

  users.push(user);
  return user;
}

function userExit(user) {
  users.splice(
    users.findIndex((u) => u.id === user.id),
    1,
  );
}

function getUsersInRoom(room) {
  return users.filter((user) => user.room === room);
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  userJoin,
  userExit,
  getUsersInRoom,
  getCurrentUser,
};
