import {NextFunction, Request, Response} from 'express';
import {findMovieImages} from '../services/images.service';

export async function getMovieImages(req: Request, res: Response, next: NextFunction) {
  try {
    console.log(req.params.id);
    const images = await findMovieImages(req.params.id);
    res.json(images);
  } catch (error) {
    next(error);
  }
}
