const IOEvent = {
  CONNECTION: 'connection',
  DISCONNECTION: 'disconnection',
  LOGIN: 'login',
  ROOM_USERS: 'room_users',
  SEND_MESSAGE: 'send_message',
  GET_MESSAGES: 'get_messages'
};

const IOResponse = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure'
}

module.exports = {
  IOEvent,
  IOResponse
}