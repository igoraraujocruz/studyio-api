import 'reflect-metadata';
import 'dotenv/config';
import '@shared/container';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import '@shared/infra/typeorm';
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';
import { routes } from '@shared/infra/http/routes';
import { AppError } from '@shared/errors/AppError';
import { isCelebrateError } from 'celebrate';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { rateLimiter } from '@shared/infra/http/middlewares/rateLimiter';
import swaggerFile from '../../../../swagger.json';

const app = express();
app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(
    cors({
        origin: 'http://localhost:3000',
    }),
);
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use((error: Error, _: Request, response: Response, __: NextFunction) => {
    if (error instanceof AppError) {
        const { statusCode } = error;

        return response.status(statusCode).json({
            status: 'error',
            message: error.message,
        });
    }

    if (isCelebrateError(error)) {
        const values = error.details.values();
        let { message } = values.next().value.details[0];
        message = message.replace('"', '').replace('"', '');

        return response.status(400).json({
            status: 'error',
            type: 'validation',
            message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: error.message,
    });
});

app.listen(3333, () => {
    console.log('server started!');
});
