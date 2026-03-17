'use client';

import { BillDetailData } from '@/hooks/useBillForm';

interface BillDetailTabProps {
  formData: BillDetailData;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function BillDetailTab({ formData, isLoading, onChange }: BillDetailTabProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Month and Year Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Month Field */}
        <div>
          <label
            htmlFor="month"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Month <span className="text-red-500">*</span>
          </label>
          <select
            id="month"
            name="month"
            value={formData.month}
            onChange={onChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select a month</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {new Date(2024, month - 1).toLocaleString('default', {
                  month: 'long',
                })}
              </option>
            ))}
          </select>
        </div>

        {/* Year Field */}
        <div>
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Year <span className="text-red-500">*</span>
          </label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={onChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select a year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Amount */}
      <div>
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Total Amount <span className="text-red-500">*</span>
        </label>
        <input
          id="amount"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onChange}
          placeholder="Enter amount"
          step="0.01"
          min="0"
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {/* Engine Consumption */}
      <div>
        <label
          htmlFor="engineConsumption"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Engine Consumption <span className="text-red-500">*</span>
        </label>
        <input
          id="engineConsumption"
          type="number"
          name="engineConsumption"
          value={formData.engineConsumption}
          onChange={onChange}
          placeholder="Enter engine consumption"
          step="0.01"
          min="0"
          disabled={isLoading}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
}
