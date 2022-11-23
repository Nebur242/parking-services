import * as express from 'express';
import { Roles } from '../../config/roles';
import usersController from '../../modules/users/users.controller';
import { auth } from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import validators from '../../modules/users/validators';

const router = express.Router();

router.get('/', auth([Roles.ADMIN]), usersController.findAll);
router.get('/:id', auth([Roles.ADMIN]), usersController.findOne);
router.patch(
	'/:id',
	auth([Roles.ADMIN]),
	validate(validators.updateUser),
	usersController.update
);
router.delete('/:id', auth([Roles.ADMIN]), usersController.delete);

export default router;
