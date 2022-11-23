import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import bookingService from '../bookings/booking.service';
import stagesService from '../stages/stages.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './models/place.model';

interface IPlaceStat {
	date: Date;
	count: number;
}

const createPlace = async (createPlaceDto: CreatePlaceDto) => {
	await stagesService.findOne(createPlaceDto.stage);
	return Place.create(createPlaceDto);
};

const findOne = async (id: string) => {
	const place = await Place.findById(id).populate('stage');
	if (!place) throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
	return place;
};

const findAll = (filter: FilterDto | {}) => {
	return Place.find(filter).populate('stage');
};

const updatePlace = async (updatePlaceDto: UpdatePlaceDto) => {
	const { id, ...restDto } = updatePlaceDto;
	const place = await findOne(id);
	await Place.findByIdAndUpdate(place._id, restDto);
	return findOne(id);
};

const deletePlace = async (id: string) => {
	const place = await findOne(id);
	await place.remove();
	return place;
};

const placeStats = async (id: string) => {
	const bookings = await bookingService.findAll({
		place: id,
	});

	return bookings.reduce((acc: IPlaceStat[], curr) => {
		const currentDate = curr.createdAt.toLocaleDateString();
		if (!currentDate) return acc;
		const dateAlreadyExistsIndex = acc.findIndex(
			(d) => d.date.toString() === currentDate
		);

		if (dateAlreadyExistsIndex > -1) {
			acc[dateAlreadyExistsIndex] = {
				...acc[dateAlreadyExistsIndex],
				count: acc[dateAlreadyExistsIndex].count + 1,
			};
		}

		return [
			...acc,
			{
				date: currentDate,
				count: 1,
			},
		];
	}, []);
};

export default {
	createPlace,
	updatePlace,
	deletePlace,
	findAll,
	findOne,
	placeStats,
};
