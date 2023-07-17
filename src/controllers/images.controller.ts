import {NextFunction, Request, Response} from 'express';
import {findMovieImages, findRandomImage} from '../services/images.service';

export async function getMovieImages(req: Request, res: Response, next: NextFunction) {
  try {
    const images = await findMovieImages(req.params.movieId);
    res.json(images);
  } catch (error) {
    next(error);
  }
}
export async function getRandomImage(req: Request, res: Response, next: NextFunction) {
  try {
    const image = await findRandomImage();
    res.json(image);
  } catch (error) {
    next(error);
  }
}
