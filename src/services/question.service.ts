import Question from '../models/question.model';
import {Movie} from '../models/movie.model';
import Person from '../models/person.model';
import Image from '../models/image.model';
import {IQuestion} from '../types/questions.types';
import {
  findMovieById,
  findMoviesByPersonId,
  findMoviePersons,
  findRandomMovie,
  findRelatedMovies,
  findSimilarMovies,
} from './movie.service';
import {IMovie} from '../types/movie.types';
import {IImage} from '../types/images.types';
import {findMovieImages, findRandomImage} from './images.service';
import {getMovieImages} from '../controllers/images.controller';
import {getRandomNumber} from '../helpers/getRandomNumber';
import {shuffle} from '../helpers/shuffle';
import {title} from 'process';

export async function getQuestion(): Promise<IQuestion[]> {
  const question = Question.aggregate<IQuestion>([
    {
      $sample: {size: 1},
    },
  ]);

  return question;
}

export async function getTest(): Promise<any> {
  const filter = {
    'similarMovies.2': {
      $exists: true,
    },
  };

  const count = await Movie.countDocuments(filter);
  const movie = await Movie.findOne(filter)
    .skip(getRandomNumber(1, count))
    .select({id: 1, similarMovies: 1, title: 1})
    .lean();

  if (!movie) return null;

  //const similarMovies = await findSimilarMovies(movie.id);
  //const relatedMovies = await findRelatedMovies(movie.id);

  //const movie = Movie.findOne({id: 301}).populate('similarMoviesDetails');

  return await findMoviePersons(301);
  //return {
  //  ...movie,
  //  similarMovies,
  //  relatedMovies,
  //};
}

export async function generateSimilarMoviesQuestion(): Promise<any> {
  const image = await findRandomImage();
  const movie = await findMovieById(image.id);

  if (!movie) throw new Error('Unexpected error');

  const variants: IMovie[] = [];

  const similarMovies = await findSimilarMovies(movie.id);
  variants.push(...similarMovies);

  if (variants.length < 3) {
    const relatedMovies = await findRelatedMovies(movie.id);
    relatedMovies.forEach((m) => {
      if (!variants.some((variant) => variant.id === m.id || variant.id === movie.id)) {
        variants.push(m);
      }
    });
  }

  if (variants.length < 3) {
    const personsMovies = await findMoviesByPersonId(movie.persons[0].id);
    if (personsMovies) {
      personsMovies.forEach((m) => {
        if (!variants.some((variant) => variant.id === m.id || variant.id === movie.id)) {
          variants.push(m);
        }
      });
    }
  }

  if (variants.length < 3) {
    const newMovie = await findRandomMovie({productionYear: movie.productionYear});
    if (newMovie) {
      if (!variants.some((variant) => variant.id === newMovie.id || variant.id === movie.id)) {
        variants.push(newMovie);
      }
    }
  }

  if (variants.length < 3) {
    const newMovie = await findRandomMovie({productionYear: movie.productionYear});
    if (newMovie) {
      if (!variants.some((variant) => variant.id === newMovie.id || variant.id === movie.id)) {
        variants.push(newMovie);
      }
    }
  }

  if (variants.length < 3) {
    const newMovie = await findRandomMovie({productionYear: movie.productionYear});
    if (newMovie) {
      if (!variants.some((variant) => variant.id === newMovie.id || variant.id === movie.id)) {
        variants.push(newMovie);
      }
    }
  }

  return {
    answer: movie.id,
    image: image,
    variants: [
      {id: movie.id, title: movie.title},
      ...shuffle(
        variants.map((variant) => ({
          id: variant.id,
          title: variant.title,
        }))
      ).slice(0, 3),
    ].sort(() => Math.random() - 0.5),
  };
}

export async function generateRelatedMoviesQuestion(): Promise<any> {}

export async function generateMoviePersosnQuestion(): Promise<any> {}

//export async function generateDescriptionQuestion(): Promise<any> {}

//export async function generateSimilarMoviesQuestion(): Promise<any> {
//  const image = await findRandomImage();
//  const movie = await findMovieById(image.id);

//  if (!movie) throw new Error('Unexpected error');

//  const variants: IMovie[] = [];
//  let isRelatedDownload = false;

//  const similarMovies = await findSimilarMovies(movie.id);
//  similarMovies.forEach((movie) => {
//    if (!variants.some((variant) => variant.id === movie.id)) {
//      variants.push(movie);
//    }
//  });

//  let i = 0;

//  while (variants.length < 3) {
//    console.log(variants.length);
//    if (!isRelatedDownload) {
//      const relatedMovies = await findRelatedMovies(movie.id);
//      relatedMovies.forEach((movie) => {
//        if (!variants.some((variant) => variant.id === movie.id)) {
//          variants.push(movie);
//        }
//      });
//      isRelatedDownload = true;
//    }

//    if (variants.length >= 3) break;

//    if (movie.persons.length !== 0) {
//      const newMovie = await findRandomMovie({'persons.id': movie.persons[0].id});
//      if (
//        newMovie &&
//        !variants.some((variant) => variant.id === newMovie.id && movie.id === newMovie.id)
//      ) {
//        variants.push(newMovie);
//      }
//      continue;
//    }
//    const randomMovie = await findRandomMovie({productionYear: movie.productionYear});
//    if (
//      randomMovie &&
//      !variants.some((variant) => variant.id === randomMovie.id && movie.id === randomMovie.id)
//    ) {
//      variants.push(randomMovie);
//    }

//    i++;
//  }

//  return {
//    answer: movie.id,
//    image: image,
//    variants: [
//      {id: movie.id, title: movie.title},
//      ...shuffle(
//        variants.map((variant) => ({
//          id: variant.id,
//          title: variant.title,
//        }))
//      ).slice(0, 3),
//    ].sort(() => Math.random() - 0.5),
//  };
//}
