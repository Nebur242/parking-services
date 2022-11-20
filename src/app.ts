import express, { Response, Request } from 'express';
import helmet from 'helmet';
import routesV1 from './routes/v1';
import errorsMiddleware from './middlewares/error';
import morgan from './config/morgan';
import { ApiError } from './utils/ApiError';
import httpStatus from 'http-status';
import passport from 'passport';
import { jwtStrategy } from './config/passport';

const globalPrefix = '/api';

const app = express();

//Request logger
app.use(morgan.successHandler);
app.use(morgan.errorHandler);

// set security HTTP headers
app.use(helmet());

app.use(express.json());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// v1 api routes
app.use(`${globalPrefix}/v1`, routesV1);

// catch uncaugth routes
app.use((_req: Request, _res: Response, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorsMiddleware.errorConverter);

// handle error
app.use(errorsMiddleware.errorHandler);

export { app };
