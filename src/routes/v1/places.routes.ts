import express from 'express';
import validate from '../../middlewares/validate';
import validators from '../../modules/places/validators';
import placesController from '../../modules/places/places.controller';
import { auth } from '../../middlewares/auth';
import { Roles } from '../../config/roles';

const router = express.Router();

router.get('/', validate(validators.filterQuery), placesController.findAll);
router.post(
	'/',
	auth([Roles.ADMIN]),
	validate(validators.createPlace),
	placesController.create
);
router.get('/:id', validate(validators.findOne), placesController.findOne);
router.patch(
	'/:id',
	auth([Roles.ADMIN]),
	validate(validators.updatePlace),
	placesController.update
);
router.delete(
	'/:id',
	auth([Roles.ADMIN]),
	validate(validators.findOne),
	placesController.delete
);

export default router;
