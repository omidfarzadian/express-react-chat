import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Login from './login/login';
import Chat from './chat/chat';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3200');

export default function App() {
  return (
    <div className="bg-zinc-200 w-screen h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="chat" element={<Chat socket={socket} />} />
      </Routes>
    </div>
  );
}
