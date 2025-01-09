export const hasPermission = (role: Role, requiredRoles: Role[]): boolean => {
	if (role === 'owner') {
		return true;
	}

	if (requiredRoles.length === 0) {
		return false;
	}

	return requiredRoles.includes(role);
};

export type Role = 'owner' | 'admin' | 'editor' | 'user';

export const rolesEnum = ['owner', 'admin', 'editor', 'user'] as const;

export const roles: {
	[key in Role]: Role;
} = {
	owner: 'owner',
	admin: 'admin',
	editor: 'editor',
	user: 'user',
};
