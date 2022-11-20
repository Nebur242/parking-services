import httpStatus from 'http-status';
import { TokenTypes } from '../../config/tokens';
import { ApiError } from '../../utils/ApiError';
import { Token } from '../tokens/models/token.model';
import tokensService from '../tokens/tokens.service';
import usersService from '../users/users.service';
import { logger } from '../../config/logger';
import { LoginDto } from './dto/login.dto';
import { IUserDoc } from '../users/models/user.model';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const register = async (registerDto: CreateUserDto) => {
	const user = await usersService.create(registerDto);
	const tokens = await tokensService.generateAuthTokens(user);
	return { user, tokens };
};

const loginUserWithEmailAndPassword = async (loginDto: LoginDto) => {
	const { email, password } = loginDto;
	const user = await usersService.findOneByEmail(email);
	if (!user || !(await user.isPasswordMatch(password))) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			'Incorrect email or password'
		);
	}
	const tokens = await tokensService.generateAuthTokens(user);
	return { user, tokens };
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

const refreshAuth = async (refreshTokenDto: RefreshTokenDto) => {
	try {
		const accessTokenVerified = await tokensService.verifyToken(
			refreshTokenDto.accessToken
		);

		if (!accessTokenVerified) throw new Error();

		const refreshTokenDoc = await tokensService.verifyRefreshToken(
			refreshTokenDto.refreshToken,
			TokenTypes.REFRESH
		);

		const user = await usersService.findOne(refreshTokenDoc.user._id);

		if (!user) throw new Error();

		await refreshTokenDoc.remove();

		return tokensService.generateAuthTokens(user);
	} catch (error) {
		logger.error(error);
		throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
	}
};

const authenticate = async (user: IUserDoc) => {
	const tokens = await tokensService.generateAuthTokens(user);
	return { user, tokens };
};

export default {
	register,
	loginUserWithEmailAndPassword,
	logout,
	refreshAuth,
	authenticate,
};
