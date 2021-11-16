import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ModulesController } from '@modules/modules/infra/http/controllers/ModulesController';

export const modulesRouter = Router();
const modulesController = new ModulesController();

modulesRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().optional().allow(''),
        },
    }),
    modulesController.create,
);

modulesRouter.delete(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
    }),
    modulesController.remove,
);

modulesRouter.put(
    '/:id',
    ensureAuthenticated,
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required(),
        },
        [Segments.BODY]: {
            name: Joi.string().required(),
            description: Joi.string().optional().allow(''),
        },
    }),
    modulesController.update,
);

modulesRouter.get(
    '/:id?',
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid(),
        },
    }),
    modulesController.list,
);
