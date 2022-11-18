import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import placesService from './places.service';

interface IPlaceParam {
	id: string;
}

const create = catchAsync(
	async (
		req: Request<never, never, CreatePlaceDto, never>,
		res: Response
	) => {
		const place = await placesService.createPlace(req.body);
		res.status(httpStatus.CREATED).send(place);
	}
);

const findAll = catchAsync(async (_req: Request, res: Response) => {
	const places = await placesService.findAll();
	res.status(httpStatus.OK).send(places);
});

const findOne = catchAsync(
	async (req: Request<IPlaceParam, never, never, never>, res: Response) => {
		const place = await placesService.findOne(req.params.id);
		res.status(httpStatus.OK).send(place);
	}
);

const update = catchAsync(
	async (
		req: Request<IPlaceParam, never, Omit<UpdatePlaceDto, 'id'>, never>,
		res: Response
	) => {
		const dto: UpdatePlaceDto = {
			id: req.params.id,
			...req.body,
		};
		const place = await placesService.updatePlace(dto);
		res.status(httpStatus.OK).send(place);
	}
);

const deletePlace = catchAsync(
	async (req: Request<IPlaceParam, never, never, never>, res: Response) => {
		const place = await placesService.deletePlace(req.params.id);
		res.status(httpStatus.OK).send(place);
	}
);

export default {
	create,
	update,
	findAll,
	findOne,
	delete: deletePlace,
};
