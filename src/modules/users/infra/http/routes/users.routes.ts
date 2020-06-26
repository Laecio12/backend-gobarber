import { Router } from 'express';
import multer from 'multer';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';

const userRouter = Router();
const upload = multer(uploadConfig);
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

userRouter.post('/', userController.create);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvatarController.update,
);
export default userRouter;
