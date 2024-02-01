import { useState } from 'react';
import './login.scss';

interface IUser {
  username: string;
  chatroom: string;
}

export default function Login({ socket }: any) {
  const [username, setUsername] = useState('');
  const [chatroom, setChatroom] = useState('');

  const onLoginUser = (e: any) => {
    e.preventDefault();

    const user: IUser = {
      username,
      chatroom,
    };

    console.log(user);
    socket.emit('user', user);
  };

  return (
    <form
      onSubmit={(e) => onLoginUser(e)}
      className="w-96 rounded-2xl p-8 bg-zinc-50 card-shadow flex gap-6 flex-col"
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
          className="block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
          placeholder="user1234"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="chatroom"
          className="block text-sm font-semibold leading-6 text-zinc-900"
        >
          Chat room
        </label>
        <select
          id="chatroom"
          className="block w-full rounded-md border-0 py-1.5 px-2 text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
          defaultValue={chatroom}
          onChange={(e) => setChatroom(e.target.value)}
        >
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
          <option value="room3">Room 3</option>
        </select>
      </div>
      <button
        type="submit"
        className="flex w-full justify-center mt-4 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Sign in
      </button>
    </form>
  );
}
