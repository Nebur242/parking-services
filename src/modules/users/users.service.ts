import httpStatus from 'http-status';
import { ApiError } from '../../utils/ApiError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import bcrypt from 'bcryptjs';
import config from '../../config/config';

const create = async (createUserDto: CreateUserDto) => {
	const errors = [];
	const exists = await User.isEmailTaken(createUserDto.email);
	if (exists) {
		errors.push('Email already taken');
	}
	if (createUserDto.password !== createUserDto.confirmPassword) {
		errors.push('Passwords not match');
	}

	if (errors.length) {
		throw new ApiError(httpStatus.BAD_REQUEST, errors[0]);
	}

	return User.create(createUserDto);
};

const findAll = () => {
	return User.find();
};

const findOne = async (id: string) => {
	const user = await User.findById(id);
	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, 'User found');
	}
	return user;
};

const findOneByEmail = (email: string) => User.findOne({ email });

const update = async (updateUserDto: UpdateUserDto) => {
	const errors: string[] = [];
	const { id: _id, newPassword, confirmNewPassword, ...rest } = updateUserDto;
	const currentUser = await findOne(_id);
	const emailToUpdate = rest?.email;
	const currentPassword = rest?.password;

	if (emailToUpdate) {
		const alreadyExists = await User.isEmailTaken(emailToUpdate);

		if (alreadyExists && currentUser.email !== emailToUpdate) {
			errors.push('Email already exists...');
		}
	}

	if (currentPassword) {
		if (!newPassword || !confirmNewPassword) {
			errors.push(
				'Missing newPassword or confirmNewPassword property...'
			);
		} else {
			const newPasswordMatch = newPassword === confirmNewPassword;
			if (newPasswordMatch) {
				const salt = await bcrypt.genSalt(config.auth.saltRounds);
				rest.password = await bcrypt.hash(newPassword, salt);
			} else {
				errors.push('New passwords not match...');
			}
		}
	} else {
		delete rest.password;
	}

	if (errors.length > 0) {
		throw new ApiError(httpStatus.BAD_REQUEST, errors[0]);
	}

	await User.updateOne({ _id }, rest);
	return findOne(_id);
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
