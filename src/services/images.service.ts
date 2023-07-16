import {IImages} from '../types/images.types';
import Images from '../models/image.model';

export async function findMovieImages(id: string): Promise<IImages | null> {
  const images = Images.findOne({id: Number(id)});
  return images;
}
