import express from 'express';
import {getMovie, getMoviesByPersonId, getRandomMovie} from '../controllers/movie.controller';

const router = express.Router();

router.get('/random', getRandomMovie);
router.get('/byPersonId/:personId', getMoviesByPersonId);
router.get('/:id', getMovie);

export default router;
