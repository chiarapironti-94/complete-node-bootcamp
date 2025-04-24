import * as path from 'path';
import * as fs from 'fs';

export const SERVER_PORT = 3000;
const TOURS_SIMPLE_PATH = path.resolve(
  __dirname,
  '..',
  'dev-data',
  'data',
  'tours-simple.json'
);

export const PUBLIC_FOLDER_PATH = path.resolve(__dirname, '..', 'public');

export interface Tour {
  id: number;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult'; // or just string if you prefer flexibility
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  startDates: string[]; // consider converting to Date[] if you're parsing them
}

export const tours: Tour[] = JSON.parse(
  fs.readFileSync(TOURS_SIMPLE_PATH, 'utf-8')
);
