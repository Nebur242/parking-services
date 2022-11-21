import Joi from 'Joi';
import { objectId } from '../../../utils/custom-validation';

const createBooking = {
	body: Joi.object().keys({
		place: Joi.string().required().custom(objectId),
	}),
};

const updateBooking = {
	params: Joi.object().keys({
		id: Joi.string().required().custom(objectId),
	}),
};

export default {
	createBooking,
	updateBooking,
};
