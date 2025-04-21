import { Request, Response } from 'express';
import { tours } from '../utils';

export const getAllTours = (_: Request, response: Response) => {
  response.status(200).json({
    status: 'success',
    results: tours.length,
    tours,
  });
};

export const postTour = (request: Request, response: Response) => {
  console.log(request.body);
  response.status(201).json({
    status: 'success',
  });
};

export const getTourById = (request: Request, response: Response) => {
  console.log(request.params);
  response.status(200).json({
    status: 'success',
  });
};

export const patchTourById = (request: Request, response: Response) => {
  console.log(request.body);
  response.status(201).json({
    status: 'success',
  });
};
export const deleteTourById = (_: Request, response: Response) => {
  response.status(204).json({
    status: 'success',
  });
};
