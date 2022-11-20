import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { IUserDoc } from '../users/models/user.model';
import authService from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

const register = catchAsync(
	async (
		req: Request<never, never, CreateUserDto, never, never>,
		_res: Response
	) => {
		return authService.register(req.body);
	}
);

const login = catchAsync(
	async (
		req: Request<never, never, LoginDto, never, never>,
		_res: Response
	) => {
		return authService.loginUserWithEmailAndPassword(req.body);
	}
);

const authenticate = catchAsync(
	async (
		req: Request<never, never, LoginDto, never, never> & { user: IUserDoc },
		_res: Response
	) => {
		return authService.authenticate(req.user);
	}
);

const logout = catchAsync(async (req: Request, _res: Response) => {
	return authService.logout(req.body.refreshToken);
});

const refreshTokens = catchAsync(
	async (
		req: Request<never, never, RefreshTokenDto, never, never>,
		_res: Response
	) => {
		return authService.refreshAuth(req.body);
	}
);

export default {
	authenticate,
	register,
	refreshTokens,
	logout,
	login,
};
