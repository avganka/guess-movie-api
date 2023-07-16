import {Document} from 'mongoose';

export interface IImages extends Document {
  id: number;
  stills: IImage[];
  screenshots: IImage[];
  concepts: IImage[];
}

export interface IImage {
  id: number;
  type: IType;
  imageUrl: string;
  width: number;
  height: number;
}

type IType = 'STILL' | 'SCREENSHOT' | ' CONCEPT';
