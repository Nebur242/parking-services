import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

const create = async (createUserDto: CreateUserDto) => {
	const exists = await User.isEmailTaken(createUserDto.email);
	if (exists) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	}
	return User.create(createUserDto);
};

const findOne = async (id: string) => User.findById(id);

const findOneByEmail = (email: string) => {
	return User.findOne({ email });
};

export default {
	create,
	findOne,
	findOneByEmail,
};
