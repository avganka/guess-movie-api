import {NextFunction, Request, Response} from 'express';
import {findPersonById} from '../services/person.service';

export async function getPerson(req: Request, res: Response, next: NextFunction) {
  try {
    const person = await findPersonById(req.params.id);
    res.json(person);
  } catch (error) {
    next(error);
  }
}
