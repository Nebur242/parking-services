import mongoose from 'mongoose';
import { IUserDoc } from '../../../modules/users/models/user.model';
import { IPlaceDoc } from '../../../modules/places/models/place.model';

export interface IBooking {
	place: IPlaceDoc;
	user: IUserDoc;
	start: Date;
	end: Date;
	createdAt: Date;
	updateAt: Date;
}

const BookingSchema = new mongoose.Schema<IBooking>(
	{
		place: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Place',
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		start: {
			type: Date,
			required: true,
			default: Date.now,
		},
		end: {
			type: Date,
			required: false,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const Booking = mongoose.model('Booking', BookingSchema);

export { Booking };
