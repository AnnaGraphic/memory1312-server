import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import { createServer } from "http";
import { Server } from 'socket.io';
import { getCardsData } from './db.js';
import { randomName } from './utils/randomNameGenerator.js';

// ----- config -----
env.config();
const app = express();
const server = createServer(app);
const { PORT, CLIENT_URL } = process.env;
const stateOfRooms = {};
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
  console.log('user connected on socket', socket.id);
  console.log('socket rooms: ', socket.rooms);

  socket.on('create room', async (room) => {
    console.log('ROOM: ', room)
    try {
      const cardsData = await getCardsData();
      const shuffledCardsData = shuffleArray(cardsData);

      const finalCardsData = shuffledCardsData.map(card => ({
        id: card.id,
        name: card._doc.name,
        imageUrl: card._doc.imageUrl
      }));

      const playersName = randomName();
      
      socket.join(room); 
      console.log(room, 'created');
      io.to(room).emit('room created', room, finalCardsData, playersName);
    } catch (error) {
      console.error('Error fetching cards data:', error);
      // TODO: handle error in frontend
      socket.emit('room creation failed');
    }


    socket.on('chat message', (msg, room) => {
      console.log('caht message', msg, room);
      socket.to(room).emit('chat message', msg);
    });

    socket.on('start game', (cardsData, room) => {
      console.log("start game");
      socket.to(room).emit('game started', cardsData);
    });
  
    socket.on('set first card', (card, room) => {
      console.log('1st card: ', card.name, room);
      socket.to(room).emit('set first card', card)
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
      console.log('end game');
      io.emit('game ended');
    })
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

  });

    socket.on('join room', (room) => {
      socket.join(room);
      console.log(socket.id, 'joined', room);
      io.to(room).emit('room joined', room);
    })

  function shuffleArray(array) {
    let idCounter = 0;
    // double cards to get pairs
    const pairsArray = array.flatMap(card => [{ ...card, id: idCounter++ }, { ...card, id: idCounter++ }]);
    for (let i = pairsArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pairsArray[i], pairsArray[j]] = [pairsArray[j], pairsArray[i]];
    }
    return pairsArray;
  };

});

// ----- server -----
server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});