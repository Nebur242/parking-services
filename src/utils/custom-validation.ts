import { Roles } from '../config/roles';

export const objectId = (value, helpers) => {
	if (!value.match(/^[0-9a-fA-F]{24}$/)) {
		return helpers.message('Id not valid');
	}
	return value;
};

export const validateRolesEnum = (value: Roles[], helpers) => {
	const valid = value.every((val) => [...Object.values(Roles)].includes(val));
	if (!valid) {
		return helpers.message(
			`Roles must be in [${[...Object.values(Roles)].join(' , ')}]`
		);
	}
	return value;
};
