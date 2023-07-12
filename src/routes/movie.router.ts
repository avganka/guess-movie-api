import {getMovie} from '../controllers/movie.controller';
import express from 'express';
import Movie from '../models/movie.model';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const film = await getMovie(Movie, req.params.id);
  res.json(film);
});

export default router;
