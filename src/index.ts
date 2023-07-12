import express, {Express} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRouter from './routes/movie.router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/?authMechanism=DEFAULT`,
    {dbName: 'kinopoisk'}
  )
  .then(() => console.log('Connected to DB!!!!!'));

app.use(express.json());
app.use('/movies', movieRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
