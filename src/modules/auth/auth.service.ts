import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { TokenTypes } from '../../config/tokens';
import { ApiError } from '../../utils/ApiError';
import { catchAsync } from '../../utils/catchAsync';
import { Token } from '../tokens/models/token.model';
import tokensService from '../tokens/tokens.service';
import usersService from '../users/users.service';

const loginUserWithEmailAndPassword = async (
	email: string,
	password: string
) => {
	const user = await usersService.findOneByEmail(email);
	if (!user || !(await user.isPasswordMatch(password))) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Incorrect email or password'
		);
	}
	return user;
};

const logout = async (refreshToken: string) => {
	const refreshTokenDoc = await Token.findOne({
		token: refreshToken,
		type: TokenTypes.REFRESH,
		blacklisted: false,
	});
	if (!refreshTokenDoc) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
	}
	await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken: string) => {
	try {
		const refreshTokenDoc = await tokensService.verifyToken(
			refreshToken,
			TokenTypes.REFRESH
		);
		const user = await usersService.findOne(refreshTokenDoc.user._id);
		if (!user) {
			throw new Error();
		}
		await refreshTokenDoc.remove();
		return tokensService.generateAuthTokens(user);
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
	}
};

export default {
	loginUserWithEmailAndPassword,
	logout,
	refreshAuth,
};
