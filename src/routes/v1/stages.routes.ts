import * as express from 'express';
import stagesController from '../../modules/stages/stages.controller';
import validators from '../../modules/stages/validators';
import validate from '../../middlewares/validate';
import { auth } from '../../middlewares/auth';
import { Roles } from '../../config/roles';

const router = express.Router();

router.route('/').get(stagesController.findAll).post(
	// auth([Roles.ADMIN]),
	validate(validators.createStage),
	stagesController.create
);

router
	.route('/:id')
	.get(validate(validators.findOne), stagesController.findOne)
	.patch(
		auth([Roles.ADMIN]),
		validate(validators.updateStage),
		stagesController.update
	)
	.delete(
		auth([Roles.ADMIN]),
		validate(validators.findOne),
		stagesController.delete
	);

export default router;
