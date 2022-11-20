import Joi from 'Joi';
import { objectId } from '../../../utils/custom-validation';

const createStage = {
	body: Joi.object().keys({
		name: Joi.string().optional(),
		location: Joi.number().required(),
	}),
};

const updateStage = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string().optional(),
	}),
};

const findOne = {
	params: Joi.object().keys({
		id: Joi.string().custom(objectId),
	}),
};

export default {
	createStage,
	updateStage,
	findOne,
};
