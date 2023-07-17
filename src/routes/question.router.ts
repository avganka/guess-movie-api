import express from 'express';
import {
  getRandomQuestion,
  getScreenshopQuestion,
  getTestQuestion,
} from '../controllers/question.controller';

const router = express.Router();

router.get('/', getRandomQuestion);
router.get('/test', getTestQuestion);
router.get('/screenshot', getScreenshopQuestion);

export default router;
