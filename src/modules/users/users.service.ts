import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';

const create = async (createUserDto: CreateUserDto) => {
	const exists = await User.isEmailTaken(createUserDto.email);
	if (exists) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
	}
	return User.create(createUserDto);
};

const findAll = () => {
	return User.find();
};

const findOne = async (id: string) => {
	const user = await User.findById(id);
	if (user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User found');
	}
	return user;
};

const findOneByEmail = (email: string) => User.findOne({ email });

const update = (updateUserDto: UpdateUserDto) => {
	const { id: _id, ...rest } = updateUserDto;
	return User.updateOne({ _id }, rest);
};

const deleteUser = async (id: string) => {
	const user = await findOne(id);
	await user.remove();
	return user;
};

export default {
	create,
	findOne,
	findAll,
	findOneByEmail,
	update,
	deleteUser,
};
