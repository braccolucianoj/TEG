const PLAYER_ROLE = 'REGULAR';
const ADMIN_ROLE = 'ADMIN';
const SERVICE_ROLE = 'SERVICE';

const roles = [PLAYER_ROLE, ADMIN_ROLE, SERVICE_ROLE] as const;

export const RolesNames = {
  player: PLAYER_ROLE,
  admin: ADMIN_ROLE,
  service: SERVICE_ROLE,
};

export type Roles = typeof roles[number];
