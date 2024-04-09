import cors from 'cors';
import express from 'express';
import env from 'dotenv';
import { getCardsData } from './db.js';
env.config();

// ----- config -----
const app = express();
const { PORT, URI } = process.env;

// ----- middleware -----
app.use(cors());
app.use(express.json());

// ----- routes -----
app.get('/api/cards', getCardsData);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});