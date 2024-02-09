const messages = [];

function newMessage(newMessage) {
  messages.push(newMessage);
}

function getMessages(user, audience) {
  return messages.filter(
    (msg) => msg.user.id === user.id && msg.audience === audience,
  );
}

module.exports = {
  newMessage,
  getMessages,
};
