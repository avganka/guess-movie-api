import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

mongoose
  .connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/?authMechanism=DEFAULT`
  )
  .then(() => console.log('Connected to DB!!!!!'));

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Server');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
