import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { CreatePlaceDto } from './dto/create-place.dto';
import { FilterDto } from './dto/filter.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import placesService from './places.service';

interface IPlaceParam {
	id: string;
}

const create = catchAsync(
	(req: Request<never, never, CreatePlaceDto, never>, _res: Response) => {
		return placesService.createPlace(req.body);
	}
);

const findAll = catchAsync(
	(req: Request<never, never, never, FilterDto, never>, _res: Response) => {
		return placesService.findAll(req.query || {});
	}
);

const findOne = catchAsync(
	(req: Request<IPlaceParam, never, never, never>, _res: Response) => {
		return placesService.findOne(req.params.id);
	}
);

const update = catchAsync(
	async (
		req: Request<IPlaceParam, never, Omit<UpdatePlaceDto, 'id'>, never>,
		_res: Response
	) => {
		const dto: UpdatePlaceDto = {
			id: req.params.id,
			...req.body,
		};
		return placesService.updatePlace(dto);
	}
);

const deletePlace = catchAsync(
	(req: Request<IPlaceParam, never, never, never>, _res: Response) => {
		return placesService.deletePlace(req.params.id);
	}
);

const placeStats = catchAsync(
	(req: Request<IPlaceParam, never, never, never>, _res: Response) => {
		return placesService.placeStats(req.params.id);
	}
);

const getParkingPlaceStats = catchAsync((req: Request, _res: Response) => {
	return placesService.getParkingPlaceStats();
});

export default {
	create,
	update,
	findAll,
	findOne,
	delete: deletePlace,
	placeStats,
	getParkingPlaceStats,
};
