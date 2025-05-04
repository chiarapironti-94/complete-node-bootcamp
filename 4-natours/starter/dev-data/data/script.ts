import * as fs from 'fs';
import '../../src/config';
import '../../src/database/config/db';
import Tour from '../../src/database/models/tourModel';

const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));

const uploadTours = async () => {
  try {
    const result = await Tour.insertMany(tours);
    console.log(result);
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

uploadTours();
