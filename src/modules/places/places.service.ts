import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import bookingService from '../bookings/booking.service';
import { Booking } from '../bookings/models/booking.model';
import { Stage } from '../stages/models/stage.model';
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

const findAll = (filter: FilterDto = {}) => {
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

const getPlaceBookings = async (id: string) => {
	const bookings = await bookingService.findAll({
		place: id,
	});
	return bookings;
};

const getParkingPlaceStats = async () => {
	const [allPlaces, bookings] = await Promise.all([
		findAll(),
		bookingService.findAll(),
	]);
	const totalPlaces = allPlaces.length;
	const allBookings = bookings.length;

	const places = await Promise.all(
		allPlaces.map(async (place) => {
			const bks = await getPlaceBookings(place._id.toString());
			return {
				place,
				count: bks.length,
			};
		})
	);

	return {
		places,
		total: {
			bookings: allBookings,
			places: totalPlaces,
		},
	};
};

export default {
	createPlace,
	updatePlace,
	deletePlace,
	findAll,
	findOne,
	placeStats,
	getParkingPlaceStats,
};
