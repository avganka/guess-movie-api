import {IMovie} from '../types/movie.types';
import Movie from '../models/movie.model';
import {IQuestion} from 'types/questions.types';

export async function findMovieById(id: string): Promise<IMovie | null> {
  return Movie.findOne({id: Number(id)});
}

export async function findRandomMovie(): Promise<IMovie[]> {
  return Movie.aggregate([{$sample: {size: 1}}]);
}

export async function findMovieByPersonId(personId: string): Promise<IMovie[] | null> {
  return Movie.find({'persons.id': Number(personId)});
}
