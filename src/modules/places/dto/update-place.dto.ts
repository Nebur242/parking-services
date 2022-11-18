import { IPlace } from '../models/place.model';

export class UpdatePlaceDto implements Omit<IPlace, 'location'> {
	id: string;
	available: boolean;
}
