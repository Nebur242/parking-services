import mongoose from 'mongoose';

export interface IPlace {
	location: number;
	available: boolean;
}

const PlaceSchema = new mongoose.Schema<IPlace>(
	{
		location: {
			type: Number,
			required: true,
			min: [1, 'Must be at least 1, got {VALUE}'],
		},
		available: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

const Place = mongoose.model('Place', PlaceSchema);

export { Place };
