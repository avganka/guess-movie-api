import {Schema, model} from 'mongoose';
import {
  IBoxOffice,
  IBudget,
  ICountry,
  IMedia,
  IMovie,
  IOther,
  IPerson,
  IRating,
  IRelatedMovies,
  ITitle,
} from 'types/movie.types';

const TitleSchema = new Schema<ITitle>({
  russian: {type: String, default: null},
  english: {type: String, default: null},
  original: {type: String, default: null},
});

const CountrySchema = new Schema<ICountry>({
  id: {type: Number, required: true},
  name: {type: String, required: true},
});

const BudgetSchema = new Schema<IBudget>({
  amount: {type: Number, default: null},
  currency: {type: String, default: null},
});

const BoxOfficeSchema = new Schema<IBoxOffice>({
  budget: {type: BudgetSchema, required: true},
  worldBox: {type: BudgetSchema, required: true},
  marketing: {type: BudgetSchema, required: true},
});

const RatingSchema = new Schema<IRating>({
  imdbRating: {type: Number, required: true},
  imdbVotes: {type: Number, required: true},
  kinopoiskRating: {type: Number, required: true},
  kinopoiskVotes: {type: Number, required: true},
});

const OtherSchema = new Schema<IOther>({
  isImax: {type: Boolean, required: true},
  is3d: {type: Boolean, required: true},
  ageRestriction: {type: String, default: null},
  mpaaRating: {type: String, default: null},
});

const MediaSchema = new Schema<IMedia>({
  trailer: {type: String, default: null},
  cover: {type: String, default: null},
  poster: {type: String, default: null},
});

const RelatedMoviesSchema = new Schema<IRelatedMovies>({
  id: {type: Number, required: true},
  type: {type: String, enum: ['Film', 'TVSeries'], required: true},
  relationType: {type: String, enum: ['BEFORE', 'AFTER'], required: true},
});

const PersonSchema = new Schema<IPerson>({
  id: {type: Number, required: true},
  role: {
    type: String,
    enum: ['ACTOR', 'VOICEOVER', 'DIRECTOR', 'WRITER', 'PRODUCER', 'OPERATOR', 'COMPOSER'],
    required: true,
  },
  name: {type: String, required: true},
  originalName: {type: String, required: true},
});

const MovieSchema = new Schema<IMovie>({
  id: {type: Number, required: true},
  url: {type: String, required: true},
  type: {type: String, required: true},
  shortDescription: {type: String, default: null},
  synopsis: {type: String, default: null},
  slogan: {type: String, default: null},
  duration: {type: Number, required: true},
  top250: {type: Number, default: null},
  worldPremiere: {type: String, default: null},
  productionYear: {type: Number, required: true},
  startYear: {type: Number, default: null},
  endYear: {type: Number, default: null},
  tvSeries: {type: Boolean, required: true},
  shortFilm: {type: Boolean, required: true},
  seasons: {type: Number, default: null},
  title: {type: TitleSchema, required: true},
  genres: {type: [Number], required: true},
  countries: {type: [CountrySchema], required: true},
  boxOffice: {type: BoxOfficeSchema, required: true},
  rating: {type: RatingSchema, required: true},
  other: {type: OtherSchema, required: true},
  media: {type: MediaSchema, required: true},
  relatedMovies: {type: [RelatedMoviesSchema], required: true},
  persons: {type: [PersonSchema], required: true},
  updatedAt: {type: String, required: true},
});

export default model('Movie', MovieSchema);
