import {Document} from 'mongoose';

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
  relatedMovies: IRelatedMovies[];
  persons: IPerson[];
  updatedAt: string;
}

export interface ITitle extends Document {
  russian: string | null;
  english: string | null;
  original: string | null;
}

export interface ICountry extends Document {
  id: number;
  name: string;
}

export interface IBoxOffice extends Document {
  budget: IBudget;
  worldBox: IBudget;
  marketing: IBudget;
}

export interface IBudget extends Document {
  amount: number;
  currency: string;
}

export interface IRating extends Document {
  imdbRating: number;
  imdbVotes: number;
  kinopoiskRating: number;
  kinopoiskVotes: number;
}

export interface IOther extends Document {
  isImax: boolean;
  is3d: boolean;
  ageRestriction: string | null;
  mpaaRating: string | null;
}

export interface IMedia extends Document {
  trailer: string | null;
  cover: string | null;
  poster: string | null;
}

export interface IRelatedMovies extends Document {
  id: number;
  type: 'Film' | 'TVSeries';
  relationType: 'BEFORE' | 'AFTER';
}

export interface IPerson extends Document {
  id: number;
  role: 'ACTOR' | 'VOICEOVER' | 'DIRECTOR' | 'WRITER' | 'PRODUCER' | 'OPERATOR' | 'COMPOSER';
  name: string;
  originalName: string;
}
