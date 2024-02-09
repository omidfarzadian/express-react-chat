const users = [];

function loginUser(newUser) {
  const userAlreadyExists = users.some((user) => user.id === newUser.id);
  if (userAlreadyExists) {
    return `User already exists.`;
  }

  users.push(newUser);
}

function getUsersInRoom(room) {
  return users.filter((user) => user.room === room);
}

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  loginUser,
  getUsersInRoom,
  getCurrentUser
};
