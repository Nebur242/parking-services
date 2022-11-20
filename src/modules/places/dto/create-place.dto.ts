import { IPlace } from '../models/place.model';

export class CreatePlaceDto implements Omit<IPlace, 'stage'> {
	location: number;
	available: boolean;
	name: string;
	stage: string;
}
