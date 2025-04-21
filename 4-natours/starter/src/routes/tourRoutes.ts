import express from 'express';
import {
  getAllTours,
  postTour,
  getTourById,
  patchTourById,
  deleteTourById,
} from '../controllers/tourController';

const router = express.Router();

router.route('/').get(getAllTours).post(postTour);

router
  .route('/:id')
  .get(getTourById)
  .patch(patchTourById)
  .delete(deleteTourById);

export default router;
