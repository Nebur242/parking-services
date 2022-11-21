import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { UpdateUserDto } from './dto/update-user.dto';
import usersService from './users.service';

interface IUserParam {
	id: string;
}

const findAll = catchAsync((req: Request, _res: Response) => {
	return usersService.findAll();
});

const findOne = catchAsync(
	(req: Request<IUserParam, never, never, never>, _res: Response) => {
		return usersService.findOne(req.params.id);
	}
);

const update = catchAsync(
	async (
		req: Request<IUserParam, never, Omit<UpdateUserDto, 'id'>, never>,
		_res: Response
	) => {
		const dto: UpdateUserDto = {
			id: req.params.id,
			...req.body,
		};
		return usersService.update(dto);
	}
);

const deleteUser = catchAsync(
	(req: Request<IUserParam, never, never, never>, _res: Response) => {
		return usersService.deleteUser(req.params.id);
	}
);

export default {
	update,
	delete: deleteUser,
	findOne,
	findAll,
};
