'use client';

// Admin navigation component
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AdminNav() {
  const pathname = usePathname();
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const currentPath = pathname || window.location.pathname;
    setIsLoginPage(currentPath === '/admin' || currentPath === '/admin/');
  }, [pathname]);

  // Don't show nav on login page
  if (isLoginPage) {
    return null;
  }

  const navItems = [
    { href: '/admin/courses', label: 'Courses' },
    { href: '/admin/blog', label: 'Blog' },
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/callback-requests', label: 'Callback Requests' },
    { href: '/admin/settings', label: 'Settings' },
  ];

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
              {navItems.map((item) => (
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
