import * as express from 'express';
import validators from '../../modules/bookings/validators';
import validate from '../../middlewares/validate';
import bookingController from '../../modules/bookings/booking.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router
	.route('/')
	.get(auth(), bookingController.findAll)
	.post(auth(), validate(validators.createBooking), bookingController.create);

router
	.route('/:id')
	.patch(
		auth(),
		validate(validators.updateBooking),
		bookingController.update
	);

export default router;
