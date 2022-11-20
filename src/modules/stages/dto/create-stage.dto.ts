import { IStage } from '../models/stage.model';

export class CreateStageDto implements IStage {
	name: string;
	location: number;
}
