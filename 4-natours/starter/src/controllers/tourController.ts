import { Request, Response } from 'express';
import { tours } from '../utils';

export const getAllTours = (_: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    tours,
  });
};

export const postTour = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    status: 'success',
  });
};

export const getTourById = (req: Request, res: Response) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success',
  });
};

export const patchTourById = (req: Request, res: Response) => {
  console.log(req.body);
  res.status(201).json({
    status: 'success',
  });
};
export const deleteTourById = (_: Request, res: Response) => {
  res.status(204).json({
    status: 'success',
  });
};
