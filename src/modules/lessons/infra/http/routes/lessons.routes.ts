import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ensureAuthenticated } from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { LessonsController } from '@modules/lessons/infra/http/controllers/LessonsController';

export const lessonsRouter = Router();
const lessonsController = new LessonsController();

lessonsRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            date: Joi.date().required(),
            moduleId: Joi.string().required(),
        },
    }),
    lessonsController.create,
);

lessonsRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    lessonsController.remove,
);

lessonsRouter.put(
    '/',
    ensureAuthenticated,
    celebrate({
      [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
        date: Joi.date().required(),
        moduleId: Joi.string().required(),
      },
    }),
    lessonsController.update,
);

lessonsRouter.get(
    '/',
    ensureAuthenticated,
    lessonsController.list,
);
