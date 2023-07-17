import {Schema, model} from 'mongoose';
import {IMovie} from '../types/movie.types';

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
  title: {
    russian: {type: String, default: null},
    english: {type: String, default: null},
    original: {type: String, required: true},
  },
  genres: [{type: Number, required: true}],
  countries: [
    {
      id: {type: Number, required: true},
      name: {type: String, required: true},
    },
  ],
  boxOffice: {
    budget: {
      amount: {type: Number, default: null},
      currency: {type: String, default: null},
    },
    worldBox: {
      amount: {type: Number, default: null},
      currency: {type: String, default: null},
    },
    marketing: {
      amount: {type: Number, default: null},
      currency: {type: String, default: null},
    },
  },
  rating: {
    imdbRating: {type: Number, required: true},
    imdbVotes: {type: Number, required: true},
    kinopoiskRating: {type: Number, required: true},
    kinopoiskVotes: {type: Number, required: true},
  },
  other: {
    isImax: {type: Boolean, required: true},
    is3d: {type: Boolean, required: true},
    ageRestriction: {type: String, default: null},
    mpaaRating: {type: String, default: null},
  },
  media: {
    trailer: {type: String, default: null},
    cover: {type: String, default: null},
    poster: {type: String, default: null},
  },
  similarMovies: [
    {
      type: Number,
      required: true,
    },
  ],
  relatedMovies: [
    {
      id: {type: Number, required: true},
      type: {type: String, enum: ['Film', 'TVSeries'], required: true},
      relationType: {type: String, enum: ['BEFORE', 'AFTER'], required: true},
    },
  ],
  persons: [
    {
      id: {type: Number, required: true},
      role: {
        type: String,
        enum: ['ACTOR', 'VOICEOVER', 'DIRECTOR', 'WRITER', 'PRODUCER', 'OPERATOR', 'COMPOSER'],
        required: true,
      },
    },
  ],
  updatedAt: {type: String, required: true},
});

//MovieSchema.virtual('similarMoviesDetails', {
//  ref: 'movies',
//  localField: 'similarMovies',
//  foreignField: 'id',
//});

//MovieSchema.set('toObject', {virtuals: true});
//MovieSchema.set('toJSON', {virtuals: true});

export const Movie = model('movies', MovieSchema);
