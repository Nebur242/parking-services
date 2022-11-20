import express from 'express';
import authController from '../../modules/auth/auth.controller';
import validate from '../../middlewares/validate';
import validators from '../../modules/auth/validators';

const router = express.Router();

router.post(
	'/register',
	validate(validators.register),
	authController.register
);

router.post('/login', validate(validators.login), authController.login);

router.post(
	'/refeshTokens',
	validate(validators.refreshToken),
	authController.refreshTokens
);

export default router;
