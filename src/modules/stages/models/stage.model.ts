import mongoose from 'mongoose';

export interface IStage {
	name: string;
	location: number;
}

const StageSchema = new mongoose.Schema<IStage>(
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
	},
	{
		timestamps: true,
	}
);

const Stage = mongoose.model('Stage', StageSchema);

export { Stage };
