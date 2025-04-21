import express from 'express';
import {
  getAllUsers,
  postUser,
  getUserById,
  patchUserById,
  deleteUserById,
} from '../controllers/userController';

const router = express.Router();

router.route('/').get(getAllUsers).post(postUser);

router
  .route('/:id')
  .get(getUserById)
  .patch(patchUserById)
  .delete(deleteUserById);

export default router;
