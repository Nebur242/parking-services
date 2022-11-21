import mongoose, { Document } from 'mongoose';
import { IStage } from '../../stages/models/stage.model';

export interface IPlace {
	available: boolean;
	location: number;
	name: string;
	stage: IStage;
}

export interface IPlaceDoc extends IPlace, Document {}

const PlaceSchema = new mongoose.Schema<IPlace>(
	{
		name: {
			type: String,
			required: true,
			index: true,
		},
		location: {
			type: Number,
			required: true,
			index: true,
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
			index: true,
		},
	},
	{
		timestamps: true,
	}
);

PlaceSchema.index(
	{
		name: 1,
		location: 1,
		stage: 1,
	},
	{ unique: true }
);

const Place = mongoose.model('Place', PlaceSchema);

export { Place };
