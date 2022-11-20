import { IStage } from '../models/stage.model';

export class UpdateStageDto implements Omit<IStage, 'location'> {
	id: string;
	name: string;
}
