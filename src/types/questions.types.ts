import {FilterQuery} from 'mongoose';
import {IImage} from './images.types';
import {ICountry} from './movie.types';

export interface IVariantOptions {
  genres: number[];
  years: number[];
  countries: ICountry[];
}
interface IQuestion<T> {
  options: FilterQuery<T>;
  variants: T[];
}

export interface IStillQuestion<T> extends IQuestion<T> {
  answer: number;
  image?: IImage;
}
export interface IOrderQuestion<T> extends IQuestion<T> {
  answer: number[];
  image?: IImage[];
}
