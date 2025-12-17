'use client';

// Authentication guard component for admin pages
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoginPage, setIsLoginPage] = useState(false);

  useEffect(() => {
    const currentPath = pathname || window.location.pathname;
    const loginPage = currentPath === '/admin' || currentPath === '/admin/';
    setIsLoginPage(loginPage);

    // Don't check auth on login page
    if (loginPage) {
      setIsAuthenticated(true);
      return;
    }

    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        const response = await fetch('/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (data.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('admin_token');
          router.push('/admin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('admin_token');
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router, pathname]);

  if (isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated && !isLoginPage) {
    return null;
  }

  return <>{children}</>;
}
