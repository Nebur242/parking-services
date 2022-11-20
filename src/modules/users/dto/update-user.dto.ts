import { IUser } from '../models/user.model';

export class UpdateUserDto
	implements Omit<IUser, 'email' | 'password' | 'isEmailVerified'>
{
	firstname: string;
	lastname: string;
}
