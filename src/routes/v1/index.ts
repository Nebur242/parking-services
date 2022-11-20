import express from 'express';
import config from '../../config/config';
import PlacesRoute from './places.routes';
import StagesRoute from './stages.routes';
import AuthRoute from './auth.routes';

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: AuthRoute,
	},
	{
		path: '/places',
		route: PlacesRoute,
	},
	{
		path: '/stages',
		route: StagesRoute,
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
