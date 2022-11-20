import httpStatus from 'http-status';
import { ApiError } from '../utils/ApiError';
import { NextFunction, Request, Response } from 'express';
import { IUserDoc } from '../modules/users/models/user.model';
import { Roles } from '../config/roles';
import passport from 'passport';

export interface ICustomRequest extends Request {
	user?: IUserDoc | null;
}

const verifyCallback =
	(
		req: ICustomRequest,
		resolve: Function,
		reject: Function,
		roles: Roles[]
	) =>
	async (err: Error, user: IUserDoc, info: unknown) => {
		if (err || info || !user) {
			return reject(
				new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate')
			);
		}
		req.user = user;

		if (roles.length > 0) {
			const hasRole = roles.some((role) => user.roles.includes(role));
			if (!hasRole) {
				return reject(
					new ApiError(
						httpStatus.FORBIDDEN,
						"You don't have right to perform this action"
					)
				);
			}
		}
		resolve();
	};

const auth =
	(roles: Roles[] = []) =>
	async (req: ICustomRequest, res: Response, next: NextFunction) => {
		return new Promise((resolve, reject) => {
			passport.authenticate(
				'jwt',
				{ session: false },
				verifyCallback(req, resolve, reject, roles)
			)(req, res, next);
		})
			.then(next)
			.catch(next);
	};

export { auth };
