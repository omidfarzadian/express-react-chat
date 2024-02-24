const messages = [];

function newMessage(newMessage) {
  messages.push(newMessage);
}

function getMessages(audience) {
  return messages.filter((msg) => msg.audience === audience);
}

module.exports = {
  newMessage,
  getMessages,
};
