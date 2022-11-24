import mongoose, { Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Roles } from '../../../config/roles';
import config from '../../../config/config';

export interface IUser {
	firstname: string;
	lastname: string;
	email: string;
	roles: Roles[];
	password: string;
	isEmailVerified?: boolean;
}

export interface IUserDoc extends IUser, Document {}

interface IUserMethods {
	isPasswordMatch(password: string): Promise<boolean>;
}

interface UserModel extends Model<IUser, {}, IUserMethods> {
	isEmailTaken(email: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser, IUserMethods, UserModel>(
	{
		firstname: {
			type: String,
			required: true,
			trim: true,
		},
		lastname: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			validate: {
				validator: (value: string) => {
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
						value
					);
				},
				message: 'Email validation failed',
			},
		},
		roles: {
			type: [String],
			enum: [Roles.ADMIN, Roles.USER],
			required: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
			validate: {
				validator: (value: string) => {
					if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
						throw new Error(
							'Password must contain at least one letter and one number'
						);
					}
				},
			},
		},
		isEmailVerified: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
		toJSON: {
			transform(_doc, ret) {
				delete ret.password;
				return ret;
			},
		},
	}
);

userSchema.static(
	'isEmailTaken',
	async function (email: string): Promise<boolean> {
		const user = await User.findOne({ email });
		return !!user;
	}
);

userSchema.method('isPasswordMatch', async function (password: string) {
	const user = this;
	return bcrypt.compare(password, user.password);
});

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		const salt = await bcrypt.genSalt(config.auth.saltRounds);
		user.password = await bcrypt.hash(user.password, salt);
	}
	next();
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export { User };
