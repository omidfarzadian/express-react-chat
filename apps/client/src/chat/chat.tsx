import './chat.scss';
import { useEffect, useRef, useState } from 'react';
import { IOEvent } from '../models/socket.enum';
import { IUser, UserStatus } from '../models/user.model';
import { IMessage } from '../models/message.model';
import { useNavigate } from 'react-router-dom';

export default function Chat({ socket }: any) {
  const navigate = useNavigate();
  const [roomUsers, setRoomUsers] = useState<IUser[]>([]);
  const [audience, setAudience] = useState<string>('');
  // const [messageHistory, setMessageHistory] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<IUser>(
    JSON.parse(sessionStorage.getItem('user')),
  );

  useEffect(() => {
    // setCurrentUser(JSON.parse(sessionStorage.getItem('user')));
    if (currentUser === null) {
      navigate('/');
    }
    socket
      .emit(IOEvent.ROOM_USERS, currentUser.room)
      .on(
        IOEvent.ROOM_USERS,
        ({ room, users }: { room: string; users: IUser[] }) => {
          if (!users.length) {
            navigate('/');
          }
          setRoomUsers(users);
          setAudience(room);
        },
      );

    socket
      .emit(IOEvent.GET_MESSAGES, { user: currentUser, audience })
      .on(IOEvent.GET_MESSAGES, (messages) => {
        // console.log(messages);
      });

      return () => {
        socket.off(IOEvent.ROOM_USERS);
        socket.off(IOEvent.GET_MESSAGES);
      };
  }, []);

  function onSendMessage(e): void {
    e.preventDefault();

    const newMessage: IMessage = {
      user: currentUser,
      audience,
      message,
      date: new Date(),
    };

    socket.emit(IOEvent.SEND_MESSAGE, newMessage);
    setMessage('');
  }

  return (
    <div className="flex gap-8 h-[35rem]">
      <div className="card w-64 flex flex-col gap-4">
        <title className="block text-xl text-start font-bold leading-6 text-indigo-700">
          Users
        </title>
        <div className="flex flex-col">
          {roomUsers.map((user) => (
            <div key={user.id}>
              <div className="flex gap-1 items-center cursor-pointer">
                <div
                  className={
                    user.status === UserStatus.ONLINE
                      ? 'online-indicator'
                      : 'offline-indicator'
                  }
                ></div>
                <div className="text-sm font-semibold text-zinc-900">
                  {user.username}
                </div>
              </div>
              <hr className="my-1" />
            </div>
          ))}
        </div>
      </div>
      <div className="card flex flex-col w-[45rem]">
        <form onSubmit={(e) => onSendMessage(e)} className="flex gap-2 mt-auto">
          <input
            type="text"
            name="message"
            id="message"
            className="block w-full h-9 rounded-lg border-0 py-1.5 px-2 text-zinc-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
            placeholder="This is a placeholder"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center h-9 justify-center rounded-lg bg-indigo-600 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
