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

export const buildQueryFeatures = async <T extends Document>(
  model: Model<T>,
  queryObj: Record<string, unknown>
): Promise<
  Query<
    EnforceDocument<T, Record<string, unknown>>[],
    EnforceDocument<T, Record<string, unknown>>
  >
> => {
  // 1️⃣ Clone query object and remove special fields (like sort)
  const queryObjCopy = { ...queryObj };
  const excludedFields = ['sort', 'fields', 'page', 'limit'];
  excludedFields.forEach((field) => delete queryObjCopy[field]);

  // 2️⃣ Transform operators (gte, lte, etc.)
  let queryStr = JSON.stringify(queryObjCopy);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  const filterObj = JSON.parse(queryStr);

  // 3️⃣ Build the Mongoose query
  let query = model.find(filterObj);

  // 4️⃣ Apply sorting if specified
  if (queryObj.sort) {
    const sortBy = (queryObj.sort as string).split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt'); // Default sort
  }

  // 5️⃣ Only select certain fields if specified
  if (queryObj.fields) {
    const fields = (queryObj.fields as string).split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  // 6️⃣ Page and limit
  const page = Number(queryObj.page) || 1;
  const limit = Number(queryObj.limit) || 100;
  const skip = (page - 1) * limit;

  const docNumber = await model.countDocuments();
  if (skip >= docNumber) throw new Error('This page does not exist');

  query = query.skip(skip).limit(limit);

  return query;
};
