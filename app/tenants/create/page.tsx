'use client';

import { TenantForm } from '@/components/TenantForm';
import { useAuth } from '@/hooks/useAuth';

export default function CreateTenantPage() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // AuthProvider will handle redirect

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <TenantForm />
    </div>
  );
}

