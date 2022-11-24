import * as express from 'express';
import validate from '../../middlewares/validate';
import validators from '../../modules/places/validators';
import placesController from '../../modules/places/places.controller';
import { auth } from '../../middlewares/auth';
import { Roles } from '../../config/roles';

const router = express.Router();

router
	.route('/')
	.get(validate(validators.filterQuery), placesController.findAll)
	.post(
		// auth([Roles.ADMIN]),
		validate(validators.createPlace),
		placesController.create
	);

router.get('/statistics', placesController.getParkingPlaceStats);

router
	.route('/:id')
	.get(validate(validators.findOne), placesController.findOne)
	.patch(
		auth([Roles.ADMIN]),
		validate(validators.updatePlace),
		placesController.update
	)
	.delete(
		auth([Roles.ADMIN]),
		validate(validators.findOne),
		placesController.delete
	);

router.get('/:id/statistics', placesController.placeStats);

export default router;
