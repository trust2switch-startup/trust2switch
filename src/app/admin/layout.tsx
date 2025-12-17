// Admin layout
import { AuthGuard } from '@/components/admin/AuthGuard';
import { AdminNav } from '@/components/admin/AdminNav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <AdminNav />
        <main className="p-8">{children}</main>
      </div>
    </AuthGuard>
  );
}
