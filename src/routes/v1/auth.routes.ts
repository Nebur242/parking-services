import express from 'express';
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
	'/refreshTokens',
	auth(),
	validate(validators.refreshToken),
	authController.refreshTokens
);

export default router;
