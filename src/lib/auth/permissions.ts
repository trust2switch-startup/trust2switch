// Permission system for RBAC

export type Resource = 'courses' | 'blog' | 'products' | 'callbackRequests' | 'users' | 'settings';
export type Action = 'view' | 'create' | 'edit' | 'delete';

export interface Permission {
  resource: Resource;
  actions: Action[];
}

export interface UserPermissions {
  resources: Permission[];
}

// Default permissions for different roles
export const DEFAULT_PERMISSIONS: Record<string, Permission[]> = {
  admin: [
    { resource: 'courses', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'blog', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'products', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'callbackRequests', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'users', actions: ['view', 'create', 'edit', 'delete'] },
    { resource: 'settings', actions: ['view', 'create', 'edit', 'delete'] },
  ],
  editor: [
    { resource: 'courses', actions: ['view', 'create', 'edit'] },
    { resource: 'blog', actions: ['view', 'create', 'edit'] },
    { resource: 'products', actions: ['view', 'create', 'edit'] },
    { resource: 'callbackRequests', actions: ['view', 'edit'] },
  ],
};

// Check if user has permission for a resource and action
export function hasPermission(
  permissions: Permission[],
  resource: Resource,
  action: Action
): boolean {
  const resourcePermission = permissions.find((p) => p.resource === resource);
  if (!resourcePermission) return false;
  return resourcePermission.actions.includes(action);
}

// Check if user has any of the required permissions
export function hasAnyPermission(
  permissions: Permission[],
  required: Array<{ resource: Resource; action: Action }>
): boolean {
  return required.some((req) => hasPermission(permissions, req.resource, req.action));
}

// Check if user has all required permissions
export function hasAllPermissions(
  permissions: Permission[],
  required: Array<{ resource: Resource; action: Action }>
): boolean {
  return required.every((req) => hasPermission(permissions, req.resource, req.action));
}

// Parse permissions from database format
export function parsePermissions(permissionsData: any): Permission[] {
  if (!permissionsData || !Array.isArray(permissionsData)) {
    return [];
  }
  return permissionsData.map((p: any) => ({
    resource: p.resource,
    actions: Array.isArray(p.actions) ? p.actions : [],
  }));
}

// Validate permission structure
export function validatePermission(permission: any): permission is Permission {
  return (
    permission &&
    typeof permission.resource === 'string' &&
    Array.isArray(permission.actions) &&
    permission.actions.every((a: any) => typeof a === 'string')
  );
}
