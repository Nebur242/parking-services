import Joi from 'Joi';
import { objectId } from '../../../utils/custom-validation';

const createPlace = {
	body: Joi.object().keys({
		location: Joi.number().required(),
		available: Joi.boolean().optional(),
	}),
};

const updatePlace = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		available: Joi.boolean().required(),
	}),
};

const findOne = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
};

export default {
	createPlace,
	updatePlace,
	findOne,
};
