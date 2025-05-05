import * as path from 'path';
import * as fs from 'fs';
import { Model, Document, EnforceDocument, Query } from 'mongoose';

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

export const transformOperators = (
  queryObj: Record<string, any>
): Record<string, any> => {
  const queryStr = JSON.stringify(queryObj);

  const transformedStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  return JSON.parse(transformedStr);
};

export const buildQueryFeatures = <T extends Document>(
  Model: Model<T>,
  queryObj: Record<string, any>
): Query<EnforceDocument<T, {}>[], EnforceDocument<T, {}>> => {
  // 1️⃣ Clone query object and remove special fields (like sort)
  const queryObjCopy = { ...queryObj };
  const excludedFields = ['sort', 'fields', 'page', 'limit'];
  excludedFields.forEach((field) => delete queryObjCopy[field]);

  // 2️⃣ Transform operators (gte, lte, etc.)
  let queryStr = JSON.stringify(queryObjCopy);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const filterObj = JSON.parse(queryStr);

  // 3️⃣ Build the Mongoose query
  let query = Model.find(filterObj);

  // 4️⃣ Apply sorting if specified
  if (queryObj.sort) {
    const sortBy = (queryObj.sort as string).split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sort
  }

  return query;
};
