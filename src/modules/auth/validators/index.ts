import Joi from 'Joi';
import userValidators from '../../users/validators';

const register = {
	...userValidators.createUser,
};

const updateUser = {
	...userValidators.updateSelfUser,
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
};

const logout = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

const refreshToken = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
		accessToken: Joi.string().required(),
	}),
};

export default {
	register,
	login,
	refreshToken,
	logout,
	updateUser,
};
