import { io, Socket } from 'socket.io-client';

const socketServer: Socket = io('http://localhost:3900', {
  transports: ['websocket'],
});

export { socketServer };
