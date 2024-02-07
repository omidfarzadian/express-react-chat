import axios, { AxiosResponse } from 'axios';
import { IUser } from './login';

export async function loginUser(user: IUser): Promise<AxiosResponse> {
  return await axios.post('http://localhost:5000/login/', user);
}
