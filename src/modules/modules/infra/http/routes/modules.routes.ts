import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import { ModulesController } from '@modules/modules/infra/http/controllers/ModulesController';

export const modulesRouter = Router();
const modulesController = new ModulesController();

modulesRouter.post(
    '/',
    ensureAuthenticated,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
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
    '/',
    ensureAuthenticated,
    celebrate({
      [Segments.BODY]: {
        id: Joi.string().uuid().required(),
        name: Joi.string().required(),
      },
    }),
    modulesController.update,
);

modulesRouter.get(
    '/',
    ensureAuthenticated,
    modulesController.list,
);
