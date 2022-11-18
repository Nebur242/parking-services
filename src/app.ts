import express from 'express';
import routesV1 from './routes/v1';
import errorsMiddleware from './middlewares/error';

const globalPrefix = '/api';

const app = express();

app.use(express.json());

// v1 api routes
app.use(`${globalPrefix}/v1`, routesV1);

// convert error to ApiError, if needed
app.use(errorsMiddleware.errorConverter);

// handle error
app.use(errorsMiddleware.errorHandler);

export { app };
