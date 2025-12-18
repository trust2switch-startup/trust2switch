'use client';

import { useState, useEffect } from 'react';
import type { Permission, Resource, Action } from '@/lib/auth/permissions';
import { hasPermission, DEFAULT_PERMISSIONS } from '@/lib/auth/permissions';

export function usePermissions() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [role, setRole] = useState<'admin' | 'editor' | 'custom'>('admin');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('admin_token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Decode JWT token (simple decode, not verification - for client-side only)
      const payload = JSON.parse(atob(token.split('.')[1]));
      
      setRole(payload.role || 'admin');
      
      // If permissions are in token, use them
      if (payload.permissions && Array.isArray(payload.permissions)) {
        setPermissions(payload.permissions);
      } else if (payload.role && payload.role !== 'admin') {
        // Use default permissions for role
        setPermissions(DEFAULT_PERMISSIONS[payload.role] || []);
      } else {
        // Admin has all permissions
        setPermissions(DEFAULT_PERMISSIONS.admin || []);
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      // Fallback to admin permissions
      setPermissions(DEFAULT_PERMISSIONS.admin || []);
    } finally {
      setLoading(false);
    }
  }, []);

  const can = (resource: Resource, action: Action): boolean => {
    // Admin always has all permissions
    if (role === 'admin') {
      return true;
    }
    return hasPermission(permissions, resource, action);
  };

  return {
    permissions,
    role,
    loading,
    can,
  };
}
