'use client';

import Link from 'next/link';
import {useState} from 'react';
import { useAuth } from '@/hooks/useAuth';

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout, loading } = useAuth();

    if (loading) return null;
    if (!user) return null;

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-4 left-4 z-50 md:hidden p-2 bg-blue-600 text-white rounded-lg"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </button>

            <aside
                className={`fixed md:fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-8">Property Mgmt</h2>
                    <nav className="space-y-4">
                        <Link
                            href="/tenants"
                            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Tenant Management
                        </Link>
                        <Link
                            href="/tenants/create"
                            className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                            onClick={() => setIsOpen(false)}
                        >
                            Create Tenant
                        </Link>
                        <Link href="/tenants/calculate"
                              className="block px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                              onClick={() => setIsOpen(false)}  >
                            Calculate Bill
                        </Link>
                    </nav>
                </div>
                
                <div className="absolute bottom-0 w-full p-6 border-t border-gray-800">
                    <div className="mb-4">
                        <p className="text-sm text-gray-400">Logged in as:</p>
                        <p className="text-sm font-medium truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                    >
                        Log out
                    </button>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}