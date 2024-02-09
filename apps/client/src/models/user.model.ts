export interface IUser {
  id: string;
  username: string;
  room: string;
  status: UserStatus;
}

export enum UserStatus {
  OFFLINE = 'offline',
  ONLINE = 'online',
}
