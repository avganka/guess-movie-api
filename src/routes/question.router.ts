import express from 'express';
import {getRandomStillQuestion} from '../controllers/question.controller';

const router = express.Router();

router.get('/still', getRandomStillQuestion);

export default router;
