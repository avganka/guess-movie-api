import {Model} from 'mongoose';
import {IMovie} from '../types/movie.types';

export const getMovie = async (movieModel: Model<IMovie>, id: string): Promise<IMovie | null> => {
  return movieModel.findById(id);
};

export const getMoviesByPersonId = async (
  movieModel: Model<IMovie>,
  id: string
): Promise<IMovie[] | null> => {
  return movieModel.find({'persons.id': id});
};
