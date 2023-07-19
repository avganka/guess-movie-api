import {NextFunction, Request, Response} from 'express';
import {generateStillMovieQuestion} from '../services/question.service';

export async function getRandomStillQuestion(req: Request, res: Response, next: NextFunction) {
  try {
    const question = await generateStillMovieQuestion();
    res.status(200).json(question);
  } catch (error) {
    next(error);
  }
}
