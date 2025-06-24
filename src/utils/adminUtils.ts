// Admin utilities for role checking and permissions

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: 'admin';
  isAdmin: true;
}

/**
 * Check if a user has admin privileges
 */
export const isAdmin = (user: any): user is AdminUser => {
  return user?.role === 'admin' || user?.isAdmin === true;
};

/**
 * Check if current user is admin (for hooks)
 */
export const useIsAdmin = (user: any): boolean => {
  return isAdmin(user);
};

/**
 * Admin permissions enum
 */
export enum AdminPermissions {
  MANAGE_USERS = 'manage_users',
  MANAGE_JOBS = 'manage_jobs',
  MANAGE_COMPANIES = 'manage_companies',
  VIEW_ANALYTICS = 'view_analytics',
  SYSTEM_SETTINGS = 'system_settings',
  MODERATE_CONTENT = 'moderate_content'
}

/**
 * Check if admin has specific permission
 * In a more complex system, this would check against user permissions
 */
export const hasAdminPermission = (
  user: any, 
  permission: AdminPermissions
): boolean => {
  if (!isAdmin(user)) return false;
  
  // For now, all admins have all permissions
  // In production, you might want role-based permissions
  return true;
};

/**
 * Get admin dashboard routes based on permissions
 */
export const getAdminRoutes = (user: any) => {
  if (!isAdmin(user)) return [];
  
  return [
    {
      path: '/admin/dashboard',
      name: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      permission: AdminPermissions.VIEW_ANALYTICS
    },
    {
      path: '/admin/users',
      name: 'User Management',
      icon: 'fas fa-users',
      permission: AdminPermissions.MANAGE_USERS
    },
    {
      path: '/admin/jobs',
      name: 'Job Management',
      icon: 'fas fa-briefcase',
      permission: AdminPermissions.MANAGE_JOBS
    },
    {
      path: '/admin/companies',
      name: 'Company Management',
      icon: 'fas fa-building',
      permission: AdminPermissions.MANAGE_COMPANIES
    },
    {
      path: '/admin/settings',
      name: 'System Settings',
      icon: 'fas fa-cog',
      permission: AdminPermissions.SYSTEM_SETTINGS
    }
  ].filter(route => hasAdminPermission(user, route.permission));
};

/**
 * Default admin credentials for testing (REMOVE IN PRODUCTION)
 */
export const getTestAdminCredentials = () => {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Test credentials not available in production');
  }
  
  return {
    email: 'admin@jobhatch.com',
    password: 'admin123',
    note: 'These are test credentials - replace with real admin system'
  };
}; 