import { IPlace } from '../models/place.model';

export class UpdatePlaceDto implements Omit<IPlace, 'location'> {
	id: string;
	name: string;
	available: boolean;
}
