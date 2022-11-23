import Joi from 'Joi';
import { objectId, validateRolesEnum } from '../../../utils/custom-validation';

const createUser = {
	body: Joi.object().keys({
		firstname: Joi.string().required(),
		lastname: Joi.string().required(),
		email: Joi.string().email({
			minDomainSegments: 2,
			tlds: { allow: ['com', 'net'] },
		}),
		roles: Joi.string().required().custom(validateRolesEnum),
		password: Joi.string().min(6).required(),
	}),
};

const updateUser = {
	params: Joi.object().keys({
		id: Joi.string().required().custom(objectId),
	}),
	body: Joi.object().keys({
		firstname: Joi.string().optional(),
		lastname: Joi.number().optional(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] },
			})
			.optional(),
		password: Joi.string().min(6).optional(),
		newPassword: Joi.string().min(6).optional(),
		confirmNewPassword: Joi.string().min(6).optional(),
	}),
};

const updateSelfUser = {
	...updateUser,
	params: Joi.object().keys({
		id: Joi.string().optional().custom(objectId),
	}),
};

export default {
	createUser,
	updateUser,
	updateSelfUser,
};
