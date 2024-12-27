export type Role = 'superadmin' | 'admin' | 'editor';

export const hasPermission = (role: Role, requiredRoles: Role[]): boolean => {
	if (requiredRoles.length === 0) {
		return false;
	}

	if (role === 'superadmin') {
		return true;
	}

	return requiredRoles.includes(role);
};
