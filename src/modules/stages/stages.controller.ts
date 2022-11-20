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
	(req: Request<never, never, CreateStageDto, never>, res: Response) => {
		return stagesService.createStage(req.body);
	}
);

const findAll = catchAsync(async (_req: Request, res: Response) => {
	return stagesService.findAll();
});

const findOne = catchAsync(
	(req: Request<IStageParam, never, never, never>, res: Response) => {
		return stagesService.findOne(req.params.id);
	}
);

const update = catchAsync(
	(
		req: Request<IStageParam, never, Omit<UpdateStageDto, 'id'>, never>,
		res: Response
	) => {
		const dto: UpdateStageDto = {
			id: req.params.id,
			...req.body,
		};
		return stagesService.updateStage(dto);
	}
);

const deleteStage = catchAsync(
	(req: Request<IStageParam, never, never, never>, res: Response) => {
		return stagesService.deleteStage(req.params.id);
	}
);

export default {
	create,
	findAll,
	findOne,
	update,
	delete: deleteStage,
};
