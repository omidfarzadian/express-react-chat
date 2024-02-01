import './App.scss';
import Login from './login/login';
import { Socket, io } from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function App() {
  return (
    <div className="bg-zinc-200 w-screen h-screen flex items-center justify-center">
      <Login socket={socket}/>
    </div>
  );
}