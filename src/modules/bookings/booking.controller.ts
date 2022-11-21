import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { CreateBookingDto } from './dto/create-booking.dto';
import bookingService from './booking.service';
import { IUserDoc } from '../users/models/user.model';

interface IBookingParam {
	id: string;
}

const create = catchAsync(
	(
		req: Request<never, never, CreateBookingDto, never> & {
			user: IUserDoc;
		},
		_res: Response
	) => {
		return bookingService.createBooking({
			...req.body,
			user: req.user,
		});
	}
);

const update = catchAsync(
	async (
		req: Request<IBookingParam, never, never, never>,
		_res: Response
	) => {
		return bookingService.updateBooking(req.params.id);
	}
);

export default {
	create,
	update,
};
