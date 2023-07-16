import express, {Express} from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import movieRouter from './routes/movie.router';
import personRouter from './routes/person.router';
import imagesRouter from './routes/images.router';
import questionRouter from './routes/question.router';
import errorHandler from './middlewares/errorHandler';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.MONGO_HOST}:27017/?authMechanism=DEFAULT`,
    {dbName: 'kinopoisk'}
  )
  .then(() => console.log('Connected to DB!!!!!'));

app.use(cors());

app.use(express.json());
app.use('/movies', movieRouter);
app.use('/persons', personRouter);
app.use('/images', imagesRouter);
app.use('/question', questionRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
