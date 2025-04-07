// app/dashboard/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated (e.g., by checking a cookie)
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');

        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard!</p>
        </div>
    );
}