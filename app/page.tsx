import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
          <Link
            href="/tenants"
            className="text-blue-600 font-medium hover:text-blue-700"
          >
            Go to Tenants
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Tenant Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Efficiently manage and track your property tenants
          </p>
          <Link
            href="/tenants/create"
            className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Create Your First Tenant
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Easy Tenant Creation
            </h2>
            <p className="text-gray-600">
              Quickly add new tenants with essential information like name, floor, and lease period.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Organize & Track
            </h2>
            <p className="text-gray-600">
              Keep all tenant information organized by floor and lease month/year for easy management.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Secure & Reliable
            </h2>
            <p className="text-gray-600">
              Your tenant data is securely stored and managed through our reliable API.
            </p>
          </div>
        </div>

        {/* Quick Start Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Start</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">
                1
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Go to Tenants Page</h3>
                <p className="text-gray-600">
                  <Link href="/tenants" className="text-blue-600 hover:text-blue-700 font-medium">
                    Navigate to the tenants management page
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">
                2
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Create a Tenant</h3>
                <p className="text-gray-600">
                  Click the &quot;Create Tenant&quot; button and fill in the required information
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-md bg-blue-600 text-white font-bold">
                3
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Submit the Form</h3>
                <p className="text-gray-600">
                  Fill in the tenant details (name, floor, month, and year) and submit
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
