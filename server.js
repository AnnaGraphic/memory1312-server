import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import { getCardsData } from './db.js';

// ----- config -----
const app = express();
env.config();
const { PORT, CLIENT_URL } = process.env;

// ----- middleware -----
app.use(cors(
  {
    origin: CLIENT_URL,
  }
));

app.use(express.json());

// ----- routes -----
app.get('/api/cards', getCardsData);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});