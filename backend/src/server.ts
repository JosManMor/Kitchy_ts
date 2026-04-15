import express from 'express';
import env from './config/config.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.listen(env.BACKEND_PORT, () => {
  console.log(`Server is running on port ${env.BACKEND_PORT}`);
});
