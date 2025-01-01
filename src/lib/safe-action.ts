import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient();

// TODO: Implement session management and role based access control
export const authActionClient = createSafeActionClient();
