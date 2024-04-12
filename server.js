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
// handle cors for socket.io during developing:
app.use(cors(
  {
    origin: CLIENT_URL,
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
  io.emit('chat message', msg);
  });

  socket.on('start game', (cardsData) => {
    console.log("start game");
    io.emit('game started', cardsData);
    });

  socket.on('set first card', (card) => {
    console.log('1st card: ', card.name);
    io.emit('set first card', card)
  });

  socket.on('set second card', (card) => {
    console.log('2nd card: ', card.name);
    io.emit('set second card', card)
  });

  socket.on('flip card', (cardId) => {
    console.log('flip card');
    io.emit('card flipped', cardId);
  })

  socket.on('end game', () => {
    io.emit('game ended');
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// ----- server -----
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});