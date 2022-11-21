import { IUser } from '../models/user.model';

export class UpdateUserDto
	implements Omit<IUser, 'email' | 'password' | 'isEmailVerified' | 'roles'>
{
	firstname: string;
	lastname: string;
	id: string;
}
