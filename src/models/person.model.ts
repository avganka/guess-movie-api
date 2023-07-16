import {Schema, model} from 'mongoose';
import {IPerson} from '../types/person.types';

const PersonSchema = new Schema<IPerson>({
  id: {type: Number, required: true},
  name: {
    type: String,
    default: null,
  },
  originalName: {
    type: String,
    required: true,
  },
});

export default model('persons', PersonSchema);
