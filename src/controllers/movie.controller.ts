import {Model} from 'mongoose';
import {IMovie} from '../types/movie.types';

export const getMovie = async (movieModel: Model<IMovie>, id: string): Promise<IMovie | null> => {
  return movieModel.findById(id);
};
