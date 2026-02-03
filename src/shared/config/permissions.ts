export type Role = 'user' | 'teacher' | 'admin';

export interface Permissions {
  canViewDashboard: boolean;
  canViewNotes: boolean;
  canUploadNotes: boolean;
  canViewLiveClasses: boolean;
  canStartLiveClass: boolean;
  canViewRecordedClasses: boolean;
  canUploadRecordedClasses: boolean;
  canViewTestSeries: boolean;
  canManageUsers: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Permissions> = {
  user: {
    canViewDashboard: true,
    canViewNotes: true,
    canUploadNotes: false,
    canViewLiveClasses: true,
    canStartLiveClass: false,
    canViewRecordedClasses: true,
    canUploadRecordedClasses: false,
    canViewTestSeries: true,
    canManageUsers: false,
  },
  teacher: {
    canViewDashboard: true,
    canViewNotes: true,
    canUploadNotes: true,
    canViewLiveClasses: true,
    canStartLiveClass: true,
    canViewRecordedClasses: true,
    canUploadRecordedClasses: true,
    canViewTestSeries: true,
    canManageUsers: false,
  },
  admin: {
    canViewDashboard: true,
    canViewNotes: true,
    canUploadNotes: true,
    canViewLiveClasses: true,
    canStartLiveClass: true,
    canViewRecordedClasses: true,
    canUploadRecordedClasses: true,
    canViewTestSeries: true,
    canManageUsers: true,
  },
};

export const hasPermission = (role: Role, permission: keyof Permissions): boolean => {
  return ROLE_PERMISSIONS[role]?.[permission] ?? false;
};
