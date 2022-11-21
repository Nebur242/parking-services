import { IPlace } from '../models/place.model';

export class UpdatePlaceDto
	implements Omit<IPlace, 'location' | 'stage' | 'name'>
{
	id: string;
	name?: string;
	available: boolean;
}
