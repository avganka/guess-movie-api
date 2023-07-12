import {getMovie, getMoviesByPersonId} from '../controllers/movie.controller';
import express from 'express';
import Movie from '../models/movie.model';
import movieModel from '../models/movie.model';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const movie = await getMovie(Movie, req.params.id);
  res.json(movie);
});

router.get('/byPersonId/:id', async (req, res) => {
  const movies = await getMoviesByPersonId(Movie, req.params.id);
  res.json({length: movies ? movies.length : 0, movie: movies});
});

export default router;
