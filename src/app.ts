import * as express from 'express';
import helmet from 'helmet';
import routesV1 from './routes/v1';
import errorsMiddleware from './middlewares/error';
import morgan from './config/morgan';
import { ApiError } from './utils/ApiError';
import httpStatus from 'http-status';
import passport from 'passport';
import { jwtStrategy } from './config/passport';
import cors from 'cors';

function bootstrap(app: express.Application) {
	const globalPrefix = '/api';
	const defaultVersion = 'v1';
	//Request logger
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);

	// set security HTTP headers
	app.use(helmet());
	app.use(
		cors({
			origin: 'http://localhost:3000',
		})
	);

	app.use(express.json());

	// jwt authentication
	app.use(passport.initialize());
	passport.use('jwt', jwtStrategy);

	// v1 api routes
	app.use(`${globalPrefix}/${defaultVersion}`, routesV1);

	// catch uncaugth routes
	app.use((_req: express.Request, _res: express.Response, next) => {
		next(new ApiError(httpStatus.NOT_FOUND, 'Route Not found'));
	});

	// convert error to ApiError, if needed
	app.use(errorsMiddleware.errorConverter);

	// handle error
	app.use(errorsMiddleware.errorHandler);

	return app;
}

export { bootstrap };
