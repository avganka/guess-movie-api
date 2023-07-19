import {Document} from 'mongoose';
import {IImage} from './images.types';

export interface IMovie extends Document {
  id: number;
  url: string;
  type: string;
  shortDescription: string | null;
  synopsis: string | null;
  slogan: string | null;
  duration: number;
  top250: number | null;
  worldPremiere: string | null;
  productionYear: number;
  startYear: number | null;
  endYear: number | null;
  tvSeries: boolean;
  shortFilm: boolean;
  seasons: number | null;
  title: ITitle;
  genres: number[];
  countries: ICountry[];
  boxOffice: IBoxOffice;
  rating: IRating;
  other: IOther;
  media: IMedia;
  persons: IShortPerson[];
  updatedAt: string;
  similarMovies: number[] | IMovie[];
  relatedMovies: IRelatedMovies[];
  images: {
    stills: IImage[];
    screenshots: IImage[];
    concepts: IImage[];
  };
}

export interface ITitle {
  russian: string | null;
  english: string | null;
  original: string | null;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface IBoxOffice {
  budget: IBudget;
  worldBox: IBudget;
  marketing: IBudget;
}

export interface IBudget {
  amount: number;
  currency: string;
}

export interface IRating {
  imdbRating: number;
  imdbVotes: number;
  kinopoiskRating: number;
  kinopoiskVotes: number;
}

export interface IOther {
  isImax: boolean;
  is3d: boolean;
  ageRestriction: string | null;
  mpaaRating: string | null;
}

export interface IMedia {
  trailer: string | null;
  cover: string | null;
  poster: string | null;
}

export interface IRelatedMovies {
  id: number;
  type: 'Film' | 'TVSeries';
  relationType: 'BEFORE' | 'AFTER';
}

export interface IShortPerson {
  id: number;
  role: IRole;
}

export type IRole =
  | 'ACTOR'
  | 'VOICEOVER'
  | 'DIRECTOR'
  | 'WRITER'
  | 'PRODUCER'
  | 'OPERATOR'
  | 'COMPOSER';
