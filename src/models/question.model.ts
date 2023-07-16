import {Schema, model} from 'mongoose';
import {IQuestion} from 'types/questions.types';

const questionModel = new Schema<IQuestion>({
  id: {
    type: Number,
    required: true,
  },
  stills: [
    {
      id: {type: Number, required: true},
      type: {type: String, enum: ['STILL', 'SCREENSHOT', ' CONCEPT'], required: true},
      imageUrl: {type: String, required: true},
      width: {type: Number, required: true},
      height: {type: Number, required: true},
    },
  ],
  screenshots: [
    {
      id: {type: Number, required: true},
      type: {type: String, enum: ['STILL', 'SCREENSHOT', ' CONCEPT'], required: true},
      imageUrl: {type: String, required: true},
      width: {type: Number, required: true},
      height: {type: Number, required: true},
    },
  ],
  genres: [
    {
      id: {
        type: Number,
        required: true,
      },
      genre: {
        type: String,
        required: true,
      },
    },
  ],
  title: {
    russian: {type: String, default: null},
    english: {type: String, default: null},
    original: {type: String, required: true},
  },
  countries: [
    {
      id: {type: Number, required: true},
      name: {type: String, required: true},
    },
  ],
  rating: {
    imdbRating: {type: Number, required: true},
    imdbVotes: {type: Number, required: true},
    kinopoiskRating: {type: Number, required: true},
    kinopoiskVotes: {type: Number, required: true},
  },
  media: {
    trailer: {type: String, default: null},
    cover: {type: String, default: null},
    poster: {type: String, default: null},
  },
  similarMovies: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        russian: {type: String, default: null},
        english: {type: String, default: null},
        original: {type: String, required: true},
      },
    },
  ],
});

export default model('questions', questionModel);
