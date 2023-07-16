import Question from '../models/question.model';
import {IQuestion} from '../types/questions.types';

export async function getQuestion(): Promise<IQuestion[]> {
  const question = Question.aggregate<IQuestion>([
    {
      $sample: {size: 1},
    },
  ]);

  return question;
}
