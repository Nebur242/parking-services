import * as express from 'express';
import config from '../../config/config';
import PlacesRoute from './places.routes';
import StagesRoute from './stages.routes';
import AuthRoute from './auth.routes';
import BookingsRoute from './bookings.routes';
import UsersRoute from './users.routes';

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: AuthRoute,
	},
	{
		path: '/bookings',
		route: BookingsRoute,
	},
	{
		path: '/places',
		route: PlacesRoute,
	},
	{
		path: '/stages',
		route: StagesRoute,
	},
	{
		path: '/users',
		route: UsersRoute,
	},
];

const devRoutes = [];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

if (config.env === 'development') {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

export default router;
