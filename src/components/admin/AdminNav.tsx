'use client';

// Admin navigation component
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePermissions } from '@/hooks/usePermissions';
import type { Resource } from '@/lib/auth/permissions';

export function AdminNav() {
  const pathname = usePathname();
  const [isLoginPage, setIsLoginPage] = useState(false);
  const { can, loading } = usePermissions();

  useEffect(() => {
    const currentPath = pathname || window.location.pathname;
    setIsLoginPage(currentPath === '/admin' || currentPath === '/admin/');
  }, [pathname]);

  // Don't show nav on login page
  if (isLoginPage) {
    return null;
  }

  const navItems = [
    { href: '/admin/courses', label: 'Courses', resource: 'courses' as Resource },
    { href: '/admin/blog', label: 'Blog', resource: 'blog' as Resource },
    { href: '/admin/products', label: 'Products', resource: 'products' as Resource },
    { href: '/admin/callback-requests', label: 'Callback Requests', resource: 'callbackRequests' as Resource },
    { href: '/admin/users', label: 'Users', resource: 'users' as Resource },
    { href: '/admin/settings', label: 'Settings', resource: 'settings' as Resource },
  ];

  // Filter nav items based on permissions
  const visibleNavItems = loading ? [] : navItems.filter(item => can(item.resource, 'view'));

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin';
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin/courses" className="text-xl font-bold text-gray-900">
                Admin Panel
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {visibleNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-indigo-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
