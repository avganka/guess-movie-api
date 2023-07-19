import {IOrderQuestion, IStillQuestion, IVariantOptions} from '../types/questions.types';
import {
  findRandomMovie,
  findRelatedMovies,
  findSimilarMovies,
  findMoviesByGenres,
} from './movie.service';
import {IMovie} from '../types/movie.types';
import {getRandomNumber} from '../helpers/getRandomNumber';
import {shuffle} from '../helpers/shuffle';
import {FilterQuery} from 'mongoose';

export async function generateStillMovieQuestion(): Promise<IStillQuestion<IMovie>> {
  // TODO уровни сложности
  const myFilter: FilterQuery<IMovie> = {
    'rating.kinopoiskRating': {$gt: 7.5},
    productionYear: {$gt: 2000},
    //'persons.id': 7836,
  };

  const filter = {
    'images.stills.0': {$exists: true},
    ...myFilter,
  };

  const movie = await findRandomMovie(filter);
  if (!movie) {
    return generateStillMovieQuestion();
  }

  const image = movie.images.stills[getRandomNumber(0, movie.images.stills.length - 1)];

  const variants = await generateQuestionVariantsByMovieId(movie.id, {
    genres: [...movie.genres.slice(0, 2)],
    countries: [movie.countries[0]],
    years: [movie.productionYear - 1, movie.productionYear, movie.productionYear + 1],
  });

  return {
    options: filter,
    answer: movie.id,
    image: image,
    variants: [
      movie,
      ...shuffle(variants.filter((variant) => variant.id !== movie.id)).slice(0, 3),
    ].sort(() => Math.random() - 0.5),
  };
}

export async function generateQuestionVariantsByMovieId(
  movieId: number,
  options: Partial<IVariantOptions>
) {
  const genres = options?.genres ? options.genres : [];
  const years = options?.years ? options.years : [];
  const countries = options?.countries ? options.countries : [];

  const filter = {
    $and: [
      ...genres.map((genre: number) => ({genres: genre})),
      ...countries.map((country: any) => ({'countries.id': country.id})),
      {$or: [...years.map((year: any) => ({productionYear: year}))]},
    ],
  };

  const variants: IMovie[] = [];

  const similarMovies = await findSimilarMovies(movieId);
  const relatedMovies = await findRelatedMovies(movieId);
  //const personsMovies = await findMoviesByPersonId(movie.persons[0].id);

  const similarMoviesByFilter = await findMoviesByGenres(filter);

  variants.push(...similarMovies, ...relatedMovies, ...(similarMoviesByFilter || []));

  while (variants.length < 4) {
    const newMovie = await findRandomMovie(filter);
    if (newMovie) {
      variants.push(newMovie);
    }
  }

  return variants.filter((item, index) => {
    return variants.indexOf(item) === index;
  });
}

export async function generateMoviesOrderQuestion(): Promise<IOrderQuestion<IMovie>> {
  const myFilter: FilterQuery<IMovie> = {
    //'rating.kinopoiskRating': {$gt: 7.5},
    //productionYear: {$gt: 2000},
    //'persons.id': 7836,
  };

  const filter = {
    'images.stills.0': {$exists: true},
    'relatedMovies.2': {$exists: true},
    ...myFilter,
  };

  const movie = await findRandomMovie(filter);
  if (!movie) {
    return generateMoviesOrderQuestion();
  }

  const image = movie.images.stills[getRandomNumber(0, movie.images.stills.length - 1)];

  const variants = await generateQuestionVariantsByMovieId(movie.id, {
    genres: [...movie.genres.slice(0, 2)],
    countries: [movie.countries[0]],
    years: [movie.productionYear - 1, movie.productionYear, movie.productionYear + 1],
  });

  return {
    options: filter,
    answer: [movie.id],
    image: [image],
    variants: [
      movie,
      ...shuffle(variants.filter((variant) => variant.id !== movie.id)).slice(0, 3),
    ].sort(() => Math.random() - 0.5),
  };
}

export async function generateMoviePersosnQuestion(): Promise<any> {}

export async function generateDescriptionQuestion(): Promise<any> {}
