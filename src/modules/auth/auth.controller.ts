import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import tokensService from '../tokens/tokens.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import usersService from '../users/users.service';
import authService from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const register = catchAsync(
	async (
		req: Request<never, never, CreateUserDto, never, never>,
		res: Response
	) => {
		const user = await usersService.create(req.body);
		const tokens = await tokensService.generateAuthTokens(user);
		return { user, tokens };
	}
);

const login = catchAsync(
	async (
		req: Request<never, never, LoginDto, never, never>,
		res: Response
	) => {
		const { email, password } = req.body;
		const user = await authService.loginUserWithEmailAndPassword(
			email,
			password
		);
		const tokens = await tokensService.generateAuthTokens(user);
		return { user, tokens };
	}
);

const logout = catchAsync(async (req: Request, res: Response) => {
	return authService.logout(req.body.refreshToken);
});

const refreshTokens = catchAsync(
	async (
		req: Request<never, never, RefreshTokenDto, never, never>,
		res: Response
	) => {
		const tokens = await authService.refreshAuth(req.body.refreshToken);
		return { ...tokens };
	}
);

export default {
	register,
	refreshTokens,
	logout,
	login,
};
