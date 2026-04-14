import express from 'express';
import { PORT } from './config/config.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
