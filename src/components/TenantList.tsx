'use client';

import { useState, useEffect } from 'react';
import { TenantResponse } from '@/api/tenants';

export function TenantList() {
  const [tenants, setTenants] = useState<TenantResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Note: This is a placeholder for fetching tenants from your API
    // You'll need to implement a GET endpoint or API service method
    loadTenants();
  }, []);

  const loadTenants = async () => {
    try {
      setIsLoading(true);
      // TODO: Implement GET request to fetch tenants
      const response = await fetch('http://178.156.219.218/v1/tenants');
      const data = await response.json();
      setTenants(data);

    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load tenants'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">{error}</p>
      </div>
    );
  }

  if (tenants.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-600">No tenants yet. Create your first tenant!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Tenants</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Floor
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Month
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Year
              </th>
            </tr>
          </thead>
          <tbody>
            {tenants.map((tenant, index) => (
              <tr
                key={tenant.id || index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {tenant.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{tenant.floor}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{tenant.month}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{tenant.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

