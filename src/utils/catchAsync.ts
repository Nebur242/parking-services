import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { Error } from 'mongoose';
import { MongoError } from 'mongodb';

//'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
const getStatusCode = (method: string): number => {
	switch (method) {
		case 'GET':
		case 'PUT':
		case 'PATCH':
		case 'DELETE':
			return httpStatus.OK;
		case 'POST':
			return httpStatus.CREATED;
		default:
			return httpStatus.OK;
	}
};

const catchAsync =
	(fn: Function) => (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(fn(req, res, next))
			.then((data) => {
				const statusCode = getStatusCode(req.method);
				res.status(httpStatus.OK).json({
					statusCode,
					data,
				});
			})
			.catch(next);
	};

export { catchAsync };
