import express from 'express';
import stagesController from '../../modules/stages/stages.controller';
import validators from '../../modules/stages/validators';
import validate from '../../middlewares/validate';
import { auth } from '../../middlewares/auth';
import { Roles } from '../../config/roles';

const router = express.Router();

router.get('/', stagesController.findAll);
router.get('/:id', validate(validators.findOne), stagesController.findOne);

router.post(
	'/',
	auth([Roles.ADMIN]),
	validate(validators.createStage),
	stagesController.create
);
router.patch(
	'/:id',
	auth([Roles.ADMIN]),
	validate(validators.updateStage),
	stagesController.update
);
router.delete(
	'/:id',
	auth([Roles.ADMIN]),
	validate(validators.findOne),
	stagesController.delete
);

export default router;
