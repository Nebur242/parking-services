import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { CreateStageDto } from './dto/create-stage.dto';
import stagesService from './stages.service';
import httpStatus from 'http-status';
import { UpdateStageDto } from './dto/update-stage.dto';

interface IStageParam {
	id: string;
}

const create = catchAsync(
	async (
		req: Request<never, never, CreateStageDto, never>,
		res: Response
	) => {
		const stage = await stagesService.createStage(req.body);
		res.status(httpStatus.CREATED).send(stage);
	}
);

const findAll = catchAsync(async (_req: Request, res: Response) => {
	const stages = await stagesService.findAll();
	res.status(httpStatus.OK).send(stages);
});

const findOne = catchAsync(
	async (req: Request<IStageParam, never, never, never>, res: Response) => {
		const stage = await stagesService.findOne(req.params.id);
		res.status(httpStatus.OK).send(stage);
	}
);

const update = catchAsync(
	async (
		req: Request<IStageParam, never, Omit<UpdateStageDto, 'id'>, never>,
		res: Response
	) => {
		const dto: UpdateStageDto = {
			id: req.params.id,
			...req.body,
		};
		const stage = await stagesService.updateStage(dto);
		res.status(httpStatus.OK).send(stage);
	}
);

const deleteStage = catchAsync(
	async (req: Request<IStageParam, never, never, never>, res: Response) => {
		const stage = await stagesService.deleteStage(req.params.id);
		res.status(httpStatus.OK).send(stage);
	}
);

export default {
	create,
	findAll,
	findOne,
	update,
	delete: deleteStage,
};
