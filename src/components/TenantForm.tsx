'use client';

import { useTenantForm } from '@/hooks/useTenantForm';
import { getFieldError } from '@/utils/validation';

export function TenantForm() {
  const {
    formData,
    errors,
    isLoading,
    isSuccess,
    successMessage,
    errorMessage,
    handleInputChange,
    handleSubmit,
    resetForm,
    clearMessages,
  } = useTenantForm();

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - 5 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Create Tenant</h1>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Add a new tenant to your property</p>

        {/* Success Message */}
        {isSuccess && successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  {successMessage}
                </p>
              </div>
              <button
                onClick={clearMessages}
                className="ml-auto text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">
                  {errorMessage}
                </p>
              </div>
              <button
                onClick={clearMessages}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Tenant Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tenant Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter tenant name (e.g., John Smith)"
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors 
              text-black
              ${
                getFieldError('name', errors)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-800 focus:ring-blue-500'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              aria-invalid={!!getFieldError('name', errors)}
              aria-describedby={getFieldError('name', errors) ? 'name-error' : undefined}
            />
            {getFieldError('name', errors) && (
              <p id="name-error" className="mt-1 text-sm text-red-600">
                {getFieldError('name', errors)}
              </p>
            )}
          </div>

          {/* Floor Field */}
          <div>
            <label
              htmlFor="floor"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Floor Number <span className="text-red-500">*</span>
            </label>
            <input
              id="floor"
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleInputChange}
              placeholder="e.g., 3"
              min="0"
              max="100"
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors
               text-black ${
                getFieldError('floor', errors)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              aria-invalid={!!getFieldError('floor', errors)}
              aria-describedby={getFieldError('floor', errors) ? 'floor-error' : undefined}
            />
            {getFieldError('floor', errors) && (
              <p id="floor-error" className="mt-1 text-sm text-red-600">
                {getFieldError('floor', errors)}
              </p>
            )}
          </div>

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
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors 
              text-black ${
                getFieldError('month', errors)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              aria-invalid={!!getFieldError('month', errors)}
              aria-describedby={getFieldError('month', errors) ? 'month-error' : undefined}
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
            {getFieldError('month', errors) && (
              <p id="month-error" className="mt-1 text-sm text-red-600">
                {getFieldError('month', errors)}
              </p>
            )}
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
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors 
              text-black ${
                getFieldError('year', errors)
                  ? 'border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              } disabled:bg-gray-100 disabled:cursor-not-allowed`}
              aria-invalid={!!getFieldError('year', errors)}
              aria-describedby={getFieldError('year', errors) ? 'year-error' : undefined}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            {getFieldError('year', errors) && (
              <p id="year-error" className="mt-1 text-sm text-red-600">
                {getFieldError('year', errors)}
              </p>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:flex-1 bg-blue-600 text-white font-medium py-2.5 sm:py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating...
                </>
              ) : (
                'Create Tenant'
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              disabled={isLoading}
              className="w-full sm:w-auto bg-gray-200 text-gray-800 font-medium py-2.5 sm:py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Form Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Info:</strong> All fields marked with <span className="text-red-500">*</span> are required.
            This form will submit tenant data to the management system.
          </p>
        </div>
      </div>
    </div>
  );
}

