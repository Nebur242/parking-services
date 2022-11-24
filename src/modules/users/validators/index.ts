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
		roles: Joi.required().custom(validateRolesEnum),
		password: Joi.string().min(6).required(),
		confirmPassword: Joi.string()
			.min(6)
			.required()
			.valid(Joi.ref('password')),
	}),
};

const updateUser = {
	params: Joi.object().keys({
		id: Joi.string().required().custom(objectId),
	}),
	body: Joi.object().keys({
		firstname: Joi.string().optional(),
		lastname: Joi.string().optional(),
		email: Joi.string()
			.email({
				minDomainSegments: 2,
				tlds: { allow: ['com', 'net'] },
			})
			.optional(),
		password: Joi.string().min(6).optional(),
		newPassword: Joi.string().min(6).optional(),
		confirmNewPassword: Joi.string()
			.min(6)
			.optional()
			.valid(Joi.ref('newPassword')),
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
