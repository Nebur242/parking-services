export class UpdateUserDto {
	firstname?: string;
	lastname?: string;
	id: string;
	email?: string;
	password?: string;
	newPassword?: string;
	confirmNewPassword?: string;
}
