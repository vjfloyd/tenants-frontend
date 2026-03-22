'use client';

import { ConsumptionData, UseBillFormState } from '@/hooks/useBillForm';
import {loadTenants} from '@/api/tenants';
import {useEffect, useState, useCallback} from 'react';

interface ConsumptionTabProps {
  formData: ConsumptionData;
  setFormData: React.Dispatch<React.SetStateAction<UseBillFormState>>;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ConsumptionTab({ formData, setFormData, isLoading, onChange }: ConsumptionTabProps) {

  const [error, setError] = useState<string | null>(null);

  const loadTenantData = useCallback(async () => {
    try {
      const data = await loadTenants();
      
      // Initialize form state with tenants if it's empty
      setFormData(prev => {
        if (prev.consumption.tenants.length === 0) {
          return {
            ...prev,
            consumption: {
              ...prev.consumption,
              tenants: data.map(tenant => ({
                code: tenant.code,
                name: tenant.name,
                floor: tenant.floor,
                consumption: ''
              }))
            }
          };
        }
        return prev;
      });
    } catch (err) {
      setError(
          err instanceof Error ? err.message : 'Failed to load tenants'
      );
    }
  }, [setFormData]);

  useEffect(() => {
    let isMounted = true;
    const loadData = async () => {
      if (isMounted) {
        await loadTenantData();
      }
    };
    loadData();
    return () => {
      isMounted = false;
    };
  }, [loadTenantData]);

  return (
    <div className="space-y-4">
      {formData.tenants.map((tenant) => (
        <div
          key={tenant.code}
          className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex flex-col space-y-4">
            {/* Tenant Name Header */}
            <div className="pb-3 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">{tenant.name} (Floor {tenant.floor})</h3>
            </div>

            {/* Electricity Consumption Input */}
            <div>
              <label
                htmlFor={`consumption-${tenant.code}`}
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Electricity Consumption (kWh) <span className="text-red-500">*</span>
              </label>
              <input
                id={`consumption-${tenant.code}`}
                type="number"
                name="electricityConsumption"
                data-tenant-code={tenant.code}
                value={tenant.consumption}
                onChange={onChange}
                placeholder="Enter electricity consumption"
                disabled={isLoading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      ))}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
          {error}
        </div>
      )}
    </div>
  );
}
