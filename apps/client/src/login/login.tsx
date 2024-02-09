import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOEvent, IOResponse } from '../models/socket.enum';
import { IUser, UserStatus } from '../models/user.model';

export default function Login({ socket }: any) {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>('room_1');

  const navigate = useNavigate();

  const onLoginUser = (e: any) => {
    e.preventDefault();

    const user: IUser = {
      id: socket.id,
      username,
      room,
      status: UserStatus.ONLINE,
    };

    socket.emit(IOEvent.LOGIN, user);
    socket.on(IOResponse.LOGIN_SUCCESS, (user: IUser) => {
      sessionStorage.setItem('user', JSON.stringify(user));
      navigate('/chat');
    });
  };

  return (
    <form
      onSubmit={(e) => onLoginUser(e)}
      className="card w-96 flex gap-6 flex-col"
    >
      <title className="block text-2xl text-center font-bold leading-6 text-indigo-700 mb-12">
        Welcome!
      </title>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="block text-sm font-semibold leading-6 text-zinc-900"
        >
          Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="block w-full h-10 rounded-lg border-0 py-1.5 px-2 text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
          placeholder="user1234"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="room"
          className="block text-sm font-semibold leading-6 text-zinc-900"
        >
          Room
        </label>
        <select
          id="room"
          className="block w-full h-10 rounded-lg border-0 py-1.5 px-2 text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
          required
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        >
          <option value="room_1">Room 1</option>
          <option value="room_2">Room 2</option>
          <option value="room_3">Room 3</option>
        </select>
      </div>
      <button
        type="submit"
        className="flex w-full h-9 justify-center mt-4 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </form>
  );
}
