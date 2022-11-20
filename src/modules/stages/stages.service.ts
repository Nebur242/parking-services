import httpStatus from 'http-status';
import { CreateStageDto } from './dto/create-stage.dto';
import { Stage } from './models/stage.model';
import { ApiError } from '../../utils/ApiError';
import { UpdateStageDto } from './dto/update-stage.dto';

const createStage = (createStageDto: CreateStageDto) => {
	return Stage.create(createStageDto);
};

const findAll = async () => {
	return Stage.find();
};

const findOne = async (id: string) => {
	const stage = await Stage.findById(id);
	if (!stage) throw new ApiError(httpStatus.NOT_FOUND, 'Stage not found');
	return stage;
};

const updateStage = async (updateStageDto: UpdateStageDto) => {
	const { id, ...restDto } = updateStageDto;
	const stage = await findOne(id);
	await Stage.findByIdAndUpdate(stage._id, restDto);
	return findOne(id);
};

const deleteStage = async (id: string) => {
	const stage = await findOne(id);
	await stage.remove();
	return stage;
};

export default {
	createStage,
	updateStage,
	deleteStage,
	findOne,
	findAll,
};
