import express from 'express';
import {
  getAllTours,
  postTour,
  getTourById,
  patchTourById,
  deleteTourById,
  t5cMiddleware,
} from '../controllers/tourController';

const router = express.Router();

router.route('/top-5-cheap').get(t5cMiddleware, getAllTours);

router.route('/').get(getAllTours).post(postTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(patchTourById)
  .delete(deleteTourById);

export default router;
