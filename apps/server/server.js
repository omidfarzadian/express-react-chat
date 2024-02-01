const { IO } = require('./models/enums');
const { socketConnection } = require('./utils/socket');

require('dotenv').config();
const port = process.env.PORT;

const http = require('http');
const express = require('express');
const cors = require('cors');

const { Server } = require('socket.io');

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


io.on(IO.Connection, (socket) => {
  // socketConnection(socket)
  socket.on('user', args => {
    console.log(args)
  })
});

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
