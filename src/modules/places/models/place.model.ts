import mongoose from 'mongoose';
import { IStage } from '../../stages/models/stage.model';

export interface IPlace {
	available: boolean;
	location: number;
	name: string;
	stage: IStage;
}

const PlaceSchema = new mongoose.Schema<IPlace>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		location: {
			type: Number,
			required: true,
			unique: true,
			min: [1, 'Must be at least 1, got {VALUE}'],
		},
		available: {
			type: Boolean,
			required: false,
			default: true,
		},
		stage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Stage',
		},
	},
	{
		timestamps: true,
	}
);

const Place = mongoose.model('Place', PlaceSchema);

export { Place };
