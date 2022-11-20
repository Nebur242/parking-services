import Joi from 'Joi';
import { Roles } from '../../../config/roles';

const createUser = {
	body: Joi.object().keys({
		firstname: Joi.string().required(),
		lastname: Joi.number().required(),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		}),
		roles: Joi.array<Roles>().valid(...Object.values(Roles)),
		password: Joi.string().min(6).required(),
	}),
};

export default {
	createUser,
};
