import express from 'express';
import {
  getMovie,
  getMoviesByPersonId,
  getRandomMovie,
  getRelatedMovies,
  getSimilarMovies,
} from '../controllers/movie.controller';

const router = express.Router();

router.get('/random', getRandomMovie);
router.get('/byPersonId/:personId', getMoviesByPersonId);
router.get('/:id', getMovie);
router.get('/similar/:id', getSimilarMovies);
router.get('/related/:id', getRelatedMovies);

export default router;
