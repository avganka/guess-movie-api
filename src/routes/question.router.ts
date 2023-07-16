import express from 'express';
import {getRandomQuestion} from '../controllers/question.controller';

const router = express.Router();

router.get('/', getRandomQuestion);

export default router;
