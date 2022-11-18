import express from 'express';
import config from '../../config/config';
import PlacesRoute from './places.route';

const router = express.Router();

const defaultRoutes = [
	{
		path: '/places',
		route: PlacesRoute,
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
