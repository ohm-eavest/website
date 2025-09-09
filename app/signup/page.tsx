// app/signup/page.tsx
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect signup to register page
export default function SignupPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/register');
    }, [router]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-white text-xl">Redirecting...</div>
        </div>
    );
}