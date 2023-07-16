import {IGenre} from './genres.types';
import {IImage} from './images.types';
import {ICountry, IMedia, IRating, ITitle} from './movie.types';

export interface IQuestion {
  id: number;
  title: ITitle;
  rating: IRating;
  genres: IGenre;
  media: IMedia;
  countries: ICountry[];
  similarMovies: SimilarMovie[];
  stills: IImage[];
  screenshots: IImage[];
}

interface SimilarMovie {
  title: ITitle;
}
