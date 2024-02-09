export enum IOEvent {
  CONNECTION = 'connection',
  DISCONNECTION = 'disconnection',
  LOGIN = 'login',
  ROOM_USERS = 'room_users',
  SEND_MESSAGE = 'send_message',
  GET_MESSAGES = 'get_messages'
}

export enum IOResponse {
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILURE = 'login_failure',
}
