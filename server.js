import express from 'express';
import env from 'dotenv';
env.config();
 const { PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
  }
);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});