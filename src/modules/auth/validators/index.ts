import Joi from 'Joi';
import { CreateUserDto } from '../../../modules/users/dto/create-user.dto';

const register = {
	...CreateUserDto,
};

const login = {
	body: Joi.object().keys({
		email: Joi.string().email().required(),
		password: Joi.string().min(6).required(),
	}),
};

const refreshToken = {
	body: Joi.object().keys({
		refreshToken: Joi.string().required(),
	}),
};

export default {
	register,
	login,
	refreshToken,
};
