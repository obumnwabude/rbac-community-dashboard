export const MEMBER_ID = 'example-member';
export const MENTOR_ID = 'example-mentor';
export const ADMIN_ID = 'example-admin';

export type Role = 'member' | 'mentor' | 'admin';
export const MEMBER_ROLES: Role[] = ['member'];
export const MENTOR_ROLES: Role[] = ['member', 'mentor'];
export const ADMIN_ROLES: Role[] = ['member', 'mentor', 'admin'];

export const users: Record<string, Role[]> = {
  [MEMBER_ID]: MEMBER_ROLES,
  [MENTOR_ID]: MENTOR_ROLES,
  [ADMIN_ID]: ADMIN_ROLES
};

export const usePermissionsStore = defineStore('permissions', {
  state: () => ({
    userId: MEMBER_ID,
    roles: MEMBER_ROLES
  }),
  actions: {
    setUser(userId: string, roles: Role[]) {
      this.userId = userId;
      this.roles = roles;
    }
  },
  getters: {
    isMember: (state) => state.roles.includes('member'),
    isMentor: (state) => state.roles.includes('mentor'),
    isAdmin: (state) => state.roles.includes('admin')
  }
});
