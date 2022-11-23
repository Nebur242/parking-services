import { Roles } from '../../../config/roles';
export class UpdateUserDto {
	firstname?: string;
	lastname?: string;
	id: string;
	email?: string;
	roles?: Roles[];
	password?: string;
	newPassword?: string;
	confirmNewPassword?: string;
}
