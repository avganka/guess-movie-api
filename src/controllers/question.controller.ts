import {NextFunction, Request, Response} from 'express';
import {getQuestion} from '../services/question.service';

export async function getRandomQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await getQuestion();
    res.json(question);
  } catch (error) {
    next(error);
  }
}
