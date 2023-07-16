import {NextFunction, Request, Response} from 'express';
import {findMovieById, findMovieByPersonId, findRandomMovie} from '../services/movie.service';

export async function getMovie(req: Request, res: Response, next: NextFunction) {
  try {
    const movie = await findMovieById(req.params.id);
    res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function getRandomMovie(req: Request, res: Response, next: NextFunction) {
  try {
    const movie = await findRandomMovie();
    res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function getMoviesByPersonId(req: Request, res: Response, next: NextFunction) {
  try {
    const movie = await findMovieByPersonId(req.params.personId);
    res.json(movie);
  } catch (error) {
    next(error);
  }
}
