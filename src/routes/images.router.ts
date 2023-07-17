import express from 'express';
import {getMovieImages, getRandomImage} from '../controllers/images.controller';

const router = express.Router();

router.get('/random', getRandomImage);
router.get('/:movieId', getMovieImages);

export default router;
