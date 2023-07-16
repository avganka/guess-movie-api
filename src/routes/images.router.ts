import express from 'express';
import {getMovieImages} from '../controllers/images.controller';

const router = express.Router();

router.get('/:movieId', getMovieImages);

export default router;
