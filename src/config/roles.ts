export type Role = 'owner' | 'admin' | 'editor';

export const hasPermission = (role: Role, requiredRoles: Role[]): boolean => {
	if (role === 'owner') {
		return true;
	}

	if (requiredRoles.length === 0) {
		return false;
	}

	return requiredRoles.includes(role);
};
