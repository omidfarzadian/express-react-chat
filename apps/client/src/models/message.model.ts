import { IUser } from './user.model';

export interface IMessage {
  user: IUser;
  audience: string;
  message: string;
  date: Date;
}
