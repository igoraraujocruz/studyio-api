import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
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
            moduleName: Joi.string().required(),
            description: Joi.string().optional().allow(''),
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
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            date: Joi.date().required(),
            moduleName: Joi.string().required(),
            description: Joi.string().optional().allow(''),
        },
    }),
    lessonsController.update,
);

lessonsRouter.get(
    '/:id?',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    lessonsController.list,
);
