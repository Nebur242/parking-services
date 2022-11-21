import express from 'express';
import validators from '../../modules/bookings/validators';
import validate from '../../middlewares/validate';
import bookingController from '../../modules/bookings/booking.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();

router.post(
	'/',
	auth(),
	validate(validators.createBooking),
	bookingController.create
);
router.post(
	'/:id',
	auth(),
	validate(validators.updateBooking),
	bookingController.update
);

export default router;
