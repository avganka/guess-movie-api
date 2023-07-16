import {Schema, model} from 'mongoose';
import {IImages} from '../types/images.types';

const imageModel = new Schema<IImages>({
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
  concepts: [
    {
      id: {type: Number, required: true},
      type: {type: String, enum: ['STILL', 'SCREENSHOT', ' CONCEPT'], required: true},
      imageUrl: {type: String, required: true},
      width: {type: Number, required: true},
      height: {type: Number, required: true},
    },
  ],
});

export default model('movie-images', imageModel);
