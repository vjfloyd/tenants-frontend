import Link from 'next/link';
import type { Metadata } from 'next';
import { TenantList } from '@/components/TenantList';

export const metadata: Metadata = {
  title: 'Tenants | Property Management',
  description: 'Manage your tenants',
};

export default function TenantsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Tenants Management</h1>
            <p className="text-gray-600 mt-2">Manage all your property tenants</p>
          </div>
          <Link
            href="/tenants/create"
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            + Create Tenant
          </Link>
        </div>

        <TenantList />
      </div>
    </main>
  );
}

