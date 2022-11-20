import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './models/place.model';

const createPlace = (createPlaceDto: CreatePlaceDto) => {
	return Place.create(createPlaceDto);
};

const findOne = async (id: string) => {
	const place = await Place.findById(id).populate('stage');
	if (!place) throw new ApiError(httpStatus.NOT_FOUND, 'Place not found');
	return place;
};

const findAll = async () => {
	return Place.find();
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

export default {
	createPlace,
	updatePlace,
	deletePlace,
	findAll,
	findOne,
};
