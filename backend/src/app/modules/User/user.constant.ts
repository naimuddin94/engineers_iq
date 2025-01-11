export const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
} as const;

export type TRole = keyof typeof USER_ROLE;
