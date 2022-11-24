import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import placesService from '../places/places.service';
import { IUserDoc } from '../users/models/user.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Booking } from './models/booking.model';
import { Place } from '../places/models/place.model';
import { Stage } from '../stages/models/stage.model';
import { FilterDto } from './dto/filter.dto';

const createBooking = async (
	createBookingDto: CreateBookingDto & { user: IUserDoc }
) => {
	const place = await placesService.findOne(createBookingDto.place);
	if (!place.available) {
		throw new ApiError(httpStatus.FORBIDDEN, 'Place not available');
	}
	const isCurrentlyBooking = await Booking.findOne({
		user: createBookingDto.user,
		end: null,
	});

	if (isCurrentlyBooking) {
		throw new ApiError(
			httpStatus.FORBIDDEN,
			'Please close your previous booking !'
		);
	}

	const booking = await Booking.create({
		place,
		user: createBookingDto.user,
	});

	await placesService.updatePlace({
		id: createBookingDto.place,
		available: false,
	});

	return Booking.findOne({ _id: booking._id })
		.populate({
			path: 'place',
			model: Place,
			populate: {
				path: 'stage',
				model: Stage,
			},
		})
		.populate('user');
};

const findAll = (filter: FilterDto = {}) => {
	return Booking.find(filter || {})
		.populate({
			path: 'place',
			model: Place,
			populate: {
				path: 'stage',
				model: Stage,
			},
		})
		.populate('user');
};

const findOne = async (_id: string) => {
	const booking = await Booking.findOne({ _id })
		.populate('place')
		.populate('place.stage')
		.populate('user');
	if (!booking) throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found');
	return booking;
};

const updateBooking = async (id: string) => {
	const booking = await findOne(id);
	await Booking.updateOne(
		{ _id: booking._id },
		{
			end: Date.now(),
		}
	).exec();
	await placesService.updatePlace({
		id: booking.place._id,
		available: true,
	});

	return findOne(id);
};

export default {
	createBooking,
	updateBooking,
	findAll,
};
