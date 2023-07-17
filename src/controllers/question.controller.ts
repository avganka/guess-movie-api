import {NextFunction, Request, Response} from 'express';
import {generateSimilarMoviesQuestion, getQuestion, getTest} from '../services/question.service';

export async function getRandomQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await getQuestion();
    res.json(question);
  } catch (error) {
    next(error);
  }
}
export async function getTestQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await getTest();
    res.json(question);
  } catch (error) {
    next(error);
  }
}

export async function getScreenshopQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await generateSimilarMoviesQuestion();
    res.json(question);
  } catch (error) {
    next(error);
  }
}
