import * as express from 'express';
import authController from '../../modules/auth/auth.controller';
import validate from '../../middlewares/validate';
import validators from '../../modules/auth/validators';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth(), authController.authenticate);

router.post(
	'/register',
	validate(validators.register),
	authController.register
);
router.post('/login', validate(validators.login), authController.login);
router.post(
	'/logout',
	auth(),
	validate(validators.logout),
	authController.logout
);

router.post(
	'/refreshTokens',
	validate(validators.refreshToken),
	authController.refreshTokens
);

router.patch(
	'/users',
	auth(),
	validate(validators.updateUser),
	authController.updateUser
);

export default router;
