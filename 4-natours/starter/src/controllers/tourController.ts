import { NextFunction, Request, Response } from 'express';
import APIFeatures from '../utils/APIFeatures';
import Tour from '../database/models/tourModel';

export const t5cMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage, price';
  req.query.fields = 'name, price, ratingsAverage, summary, difficulty';

  next();
};

export const getAllTours = async (req: Request, res: Response) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query);
    await features.filter().sort().limitFields().paginate();
    // const query = buildQueryFeatures(Tour, req.query);
    const tours = await features.getQuery();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      errorMsg: `Something went wrong: ${err}`,
    });
  }
};

export const postTour = async (req: Request, res: Response) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      errorMsg: `Something went wrong: ${err}`,
    });
  }
};

export const getTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      errorMsg: `Something went wrong: ${err}`,
    });
  }
};

export const patchTourById = async (req: Request, res: Response) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      errorMsg: `Something went wrong: ${err}`,
    });
  }
};
export const deleteTourById = async (req: Request, res: Response) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      throw new Error('No tour found with that ID');
    }

    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      errorMsg: `Something went wrong: ${err}`,
    });
  }
};
