'use client';

import { useBillForm } from '@/hooks/useBillForm';
import { BillDetailTab } from './tabs/BillDetailTab';
import { ConsumptionTab } from './tabs/ConsumptionTab';

export function BillForm() {
  const {
    formData,
    setFormData,
    activeTab,
    setActiveTab,
    isFormValid,
    isLoading,
    isSuccess,
    successMessage,
    errorMessage,
    handleBillDetailChange,
    handleConsumptionChange,
    handleSubmit,
    resetForm,
    clearMessages,
  } = useBillForm();

  return (
    <div className="max-w-full sm:max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Send Bill</h1>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Create and send bill to tenant</p>

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

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('billDetail')}
              className={`whitespace-nowrap py-3 px-4 sm:px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'billDetail'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Bill Detail
            </button>
            <button
              onClick={() => setActiveTab('consumption')}
              className={`whitespace-nowrap py-3 px-4 sm:px-6 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'consumption'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Tenant&apos;s Consumption
            </button>
          </nav>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Bill Detail Tab */}
          {activeTab === 'billDetail' && (
            <BillDetailTab
              formData={formData.billDetail}
              isLoading={isLoading}
              onChange={handleBillDetailChange}
            />
          )}

          {/* Tenant's Consumption Tab */}
          {activeTab === 'consumption' && (
            <ConsumptionTab
              formData={formData.consumption}
              setFormData={setFormData}
              isLoading={isLoading}
              onChange={handleConsumptionChange}
            />
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-200">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
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
                  Sending...
                </>
              ) : (
                'Send Bill'
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
        <div className="mt-6 sm:mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Info:</strong> All fields marked with <span className="text-red-500">*</span> are required.
            The Send button will be enabled once all fields are filled.
          </p>
        </div>
      </div>
    </div>
  );
}
