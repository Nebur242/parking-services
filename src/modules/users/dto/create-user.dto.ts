import { Roles } from '../../../config/roles';
import { IUser } from '../models/user.model';

export class CreateUserDto implements IUser {
	firstname: string;
	lastname: string;
	email: string;
	roles: Roles[];
	password: string;
	confirmPassword: string;
}
