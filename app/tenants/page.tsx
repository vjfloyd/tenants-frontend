'use client';

import {TenantList} from '@/components/TenantList';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function TenantsPage() {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return null; // AuthProvider will handle redirect

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-full lg:max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Tenants Management</h1>
                        <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage all your property tenants</p>
                    </div>
                    <Link href="/tenants/create"
                          className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2 px-4 sm:px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-center"
                    >
                        + Create Tenant </Link>
                </div>

                <TenantList/>
            </div>
        </div>
    );
}