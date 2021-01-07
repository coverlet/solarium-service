import dotenv from 'dotenv';
dotenv.config();
import express, { Application, Request, Response } from 'express';
import { getValidators } from './validators/get-validators';
import { setupCrons } from './setup-crons';
import cors from 'cors';


// setup crons
setupCrons();

const app: Application = express();

app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('ok');
});

app.get('/validators/:cluster', (req: Request, res: Response) => {
  // TODO proper error handling
  getValidators(req.params.cluster).then((data) => {
    res.json(data);
  });
});

app.listen(3333, () => {
  console.log(`Server listening at http://localhost:3333`);
});

