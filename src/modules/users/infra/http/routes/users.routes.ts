import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            username: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required(),
            mobilePhone: Joi.string().max(13).required(),
        },
    }),
    usersController.create,
);

usersRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    usersController.remove,
);

usersRouter.put(
    '/',
    ensureAuthenticated,
    celebrate({
      [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).required(),
        mobilePhone: Joi.string().max(13).required(),
      },
    }),
    usersController.update,
  );

export default usersRouter;
