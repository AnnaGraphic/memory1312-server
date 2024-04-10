import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import { getCardsData } from './db.js';

// ----- config -----
env.config();
const app = express();
const server = createServer(app);
const { PORT, CLIENT_URL } = process.env;
const io = new Server(server, { cors: { origin: "*" }});

// ----- middleware -----
app.use(cors(
  {
    origin: "*",
  }
));

app.use(express.json());

// ----- routes -----
app.get('/api/cards', getCardsData);

// ----- socket.IO events -----
io.on('connection', (socket) => {
  console.log('user connected on socket');

  socket.on('chat message', (msg) => {
    console.log(msg);
  io.emit(msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// ----- server -----
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});