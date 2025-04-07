// app/login/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        // Send credentials to the server
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            // Redirect to the dashboard on successful login
            router.push('/dashboard');
        } else {
            // Show error message
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center"
             style={{
                 background: 'linear-gradient(to bottom right, #000000, #454545)', // Gradient from black to lighter black
             }}>

            {/* Top Bar */}
            <div className="w-full absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                {/* Home Link (Top Left) */}
                <Link href="/" className="text-white hover:text-gray-300 text-sm">
                    ←  Retour à l'accueil
                </Link>

                {/* Signup Section (Top Right) */}
                <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">Pas encore membre ?</span>
                    <button
                        onClick={() => router.push('/signup')} // Redirect to signup page
                        className="text-white bg-transparent px-4 py-1 rounded hover:bg-blue-700 transition duration-300 border border-gray-500"
                    >
                        Inscrivez-vous
                    </button>
                </div>
            </div>

            {/* Login Section */}
            <div className="w-full max-w-md p-6">
                {/* Logo */}
                <div className="flex items-center justify-center mb-8">
                    <img
                        src="/eavest-logo.svg"
                        alt="Eavest Logo"
                        className="w-70 transform -translate-y-50"
                        onError={(e) => {
                            console.error('Image failed to load', e);
                        }}
                    />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 mb-6"></div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </p>
                )}

                {/* Email Input */}
                <div className="mb-6">
                    <label className="block text-xl font-medium text-gray-300 ">
                        Identifiant
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 no-border border-gray-700 rounded bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transform -translate-x-2"
                        placeholder="Entrez votre email"
                        required
                    />
                </div>
                {/* Divider */}
                <div className="border-t border-gray-700 mb-6"></div>


                {/* Password Input */}
                <div className="mb-6">
                    <p className="block text-xl font-medium text-gray-300 ">
                        Mot de passe
                    </p>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 no-border border-gray-700 rounded bg-transparent text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transform -translate-x-2"
                        placeholder="Entrez votre mot de passe"
                        required
                    />
                </div>

                {/* Login Button */}
                <button
                    type="button" // Changed from "submit" to "button" since we're not using a form
                    onClick={handleLogin}
                    className="w-full bg-gray-800 text-white p-2 rounded hover:bg-gray-600 transition duration-300"
                >
                    Connexion
                </button>

                <div className="mb-6 p-6">
                    <p>
                    <Link href="/" className="text-gray-400 hover:text-white text-sm flex justify-center">
                        Mot de passe oublié
                    </Link>
                    </p>
                </div>

            </div>
        </div>
    );
}