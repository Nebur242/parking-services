import Joi from 'Joi';
import { objectId } from '../../../utils/custom-validation';

const createPlace = {
	body: Joi.object().keys({
		location: Joi.number().required(),
		name: Joi.string().required(),
		available: Joi.boolean().optional(),
		stage: Joi.string().required().custom(objectId),
	}),
};

const updatePlace = {
	params: Joi.object().keys({
		id: Joi.string().required().custom(objectId),
	}),
	body: Joi.object().keys({
		available: Joi.boolean().required(),
	}),
};

const filterQuery = {
	query: Joi.object().keys({
		stage: Joi.string().optional().custom(objectId),
		available: Joi.boolean().optional(),
	}),
};

const findOne = {
	params: Joi.object().keys({
		id: Joi.string().required().custom(objectId),
	}),
};

export default {
	createPlace,
	updatePlace,
	findOne,
	filterQuery,
};
