import {IPerson} from '../types/person.types';
import Person from '../models/person.model';

export const findPersonById = async (id: string): Promise<IPerson[] | null> => {
  return Person.findOne({id: Number(id)});
};
