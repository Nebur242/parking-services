import { IPlace } from '../models/place.model';

export class CreatePlaceDto implements IPlace {
	location: number;
	available: boolean;
}
