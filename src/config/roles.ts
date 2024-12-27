export type Role = 'superadmin' | 'admin' | 'editor';

export const hasPermission = (role: Role, requiredRoles: Role[]): boolean => {
	if (role === 'superadmin') {
		return true;
	}

	if (requiredRoles.length === 0) {
		return false;
	}

	return requiredRoles.includes(role);
};
