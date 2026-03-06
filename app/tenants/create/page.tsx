import type { Metadata } from 'next';
import { TenantForm } from '@/components/TenantForm';

export const metadata: Metadata = {
  title: 'Create Tenant | Property Management',
  description: 'Create a new tenant in the property management system',
};

export default function CreateTenantPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <TenantForm />
    </main>
  );
}

