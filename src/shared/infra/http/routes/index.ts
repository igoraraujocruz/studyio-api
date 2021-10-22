import { Router } from 'express';
import { usersRouter } from '@modules/users/infra/http/routes/users.routes';
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes';
import { modulesRouter } from '@modules/modules/infra/http/routes/modules.routes';
import { lessonsRouter } from '@modules/lessons/infra/http/routes/lessons.routes';

export const routes = Router();
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/modules', modulesRouter);
routes.use('/lessons', lessonsRouter);
