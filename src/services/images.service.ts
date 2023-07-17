import {IImages} from '../types/images.types';
import Images from '../models/image.model';
import {getRandomNumber} from '../helpers/getRandomNumber';

export async function findMovieImages(id: string | number): Promise<IImages | null> {
  console.log(id);

  const images = await Images.findOne({id: Number(id)});
  return images;
}

export async function findRandomImage(): Promise<any> {
  const filter = {'stills.0': {$exists: true}};
  const count = await Images.countDocuments(filter);
  const images = await Images.findOne(filter).skip(getRandomNumber(1, count)).lean();

  if (!images) return null;

  return {
    id: images.id,
    image: images.stills[getRandomNumber(0, images.stills.length - 1)],
  };
}
