import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import stagesService from '../stages/stages.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { Place } from './models/place.model';

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

export default {
	createPlace,
	updatePlace,
	deletePlace,
	findAll,
	findOne,
};
