import {NextFunction, Request, Response} from 'express';
import {
  findMovieById,
  findMoviesByPersonId,
  findRandomMovie,
  findRelatedMovies,
  findSimilarMovies,
} from '../services/movie.service';

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
    const movie = await findMoviesByPersonId(req.params.personId);
    res.json(movie);
  } catch (error) {
    next(error);
  }
}

export async function getSimilarMovies(req: Request, res: Response, next: NextFunction) {
  try {
    const movies = await findSimilarMovies(req.params.id);
    console.log(movies);
    movies;
    res.json(movies);
  } catch (error) {
    next(error);
  }
}

export async function getRelatedMovies(req: Request, res: Response, next: NextFunction) {
  try {
    const movie = await findRelatedMovies(req.params.id);
    res.json(movie);
  } catch (error) {
    next(error);
  }
}
