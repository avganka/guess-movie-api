import {IMovie} from '../types/movie.types';
import {Movie} from '../models/movie.model';
import {getRandomNumber} from '../helpers/getRandomNumber';

export async function findMovieById(id: string | number): Promise<IMovie | null> {
  return await Movie.findOne({id: Number(id)});
}

export async function findRandomMovie(filter?: Record<string, any>): Promise<IMovie | null> {
  //return Movie.aggregate([{$sample: {size: 1}}]);

  //const currentYear = DateTime.local().year;
  //const filter = {
  //  'rating.kp': {
  //    $gte: 6,
  //    $lte: 10,
  //  },
  //  year: {$lte: currentYear, $gte: currentYear - 10},
  //  name: {$ne: null},
  //  'poster.url': {$ne: null},
  //};

  const count = await Movie.countDocuments(filter);
  ////const count = await Movie.countDocuments(filter);

  return await Movie.findOne(filter).skip(getRandomNumber(1, count)).lean();
}

export async function findMoviesByPersonId(personId: string | number): Promise<IMovie[] | null> {
  return await Movie.find({'persons.id': Number(personId)});
}

export async function findSimilarMovies(movieId: string | number): Promise<IMovie[]> {
  const movie = await Movie.aggregate([
    {
      $match: {
        id: Number(movieId),
      },
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'similarMovies',
        foreignField: 'id',
        as: 'similarMovies',
      },
    },
    {
      $project: {
        similarMovies: 1,
      },
    },
  ]);
  if (!movie) return [];
  return movie[0].similarMovies;
}

export async function findRelatedMovies(movieId: string | number): Promise<IMovie[]> {
  const movie = await Movie.aggregate([
    {
      $match: {
        id: Number(movieId),
      },
    },
    {
      $lookup: {
        from: 'movies',
        localField: 'relatedMovies.id',
        foreignField: 'id',
        as: 'relatedMovies1',
      },
    },
    {
      $addFields: {
        relatedMovies: {
          $map: {
            input: '$relatedMovies1',
            as: 'rm1',
            in: {
              $mergeObjects: [
                '$$rm1',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$relatedMovies',
                        as: 'rm',
                        cond: {$eq: ['$$rm.id', '$$rm1.id']},
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    {
      $project: {
        relatedMovies: 1,
      },
    },
  ]);
  if (!movie) return [];
  return movie[0].relatedMovies;
}

export async function findMoviePersons(movieId: string | number): Promise<IMovie[] | null> {
  const movie = await Movie.aggregate([
    {
      $match: {
        id: Number(movieId),
      },
    },
    {
      $lookup: {
        from: 'persons',
        localField: 'persons.id',
        foreignField: 'id',
        as: 'persons1',
      },
    },
    {
      $addFields: {
        persons: {
          $map: {
            input: '$persons',
            as: 'person',
            in: {
              $mergeObjects: [
                '$$person',
                {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: '$persons1',
                        as: 'person1',
                        cond: {
                          $eq: ['$$person.id', '$$person1.id'],
                        },
                      },
                    },
                    0,
                  ],
                },
              ],
            },
          },
        },
      },
    },
    //{
    //  $project: {
    //    relatedMovies: 1,
    //  },
    //},
  ]);
  if (!movie) return null;
  return movie[0].persons;
}
