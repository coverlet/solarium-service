import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// TODO send errors to influs, add stats for fetching
// https://stackoverflow.com/questions/20207063/how-can-i-delete-folder-on-s3-with-node-js
// startService();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello to a new World!');
});

app.listen(3333, () => {
  console.log(`Server listening at http://localhost:3333`);
});
