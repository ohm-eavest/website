// app/register/page.tsx
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function RegisterPage() {
    const router = useRouter();
    
    // Form state
    const [formData, setFormData] = useState({
        email: '',
        nom: '',
        prenom: '',
        telPortable: '',
        nomSociete: '',
        siren: '',
        numeroTelephone: '',
        adresseSociete: '',
        codePostal: '',
        ville: '',
        pays: ''
    });
    
    const [checkboxes, setCheckboxes] = useState({
        propositions: false,
        cgu: false,
        doubleAuth: false
    });
    
    const [error, setError] = useState('');

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field: string, checked: boolean) => {
        setCheckboxes(prev => ({
            ...prev,
            [field]: checked
        }));
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        // Basic validation
        if (!checkboxes.cgu) {
            setError('Vous devez accepter les CGU pour vous inscrire');
            return;
        }
        
        try {
            // TODO: Implement registration API call
            console.log('Registration data:', { formData, checkboxes });
            // router.push('/dashboard');
        } catch (error: any) {
            console.error('Registration error:', error);
            setError(error.message || 'Inscription échouée. Veuillez réessayer.');
        }
    };

    return (
        <div 
            className="min-h-screen text-white"
            style={{
                backgroundImage: "url('/client _background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Top Bar */}
            <div className="w-full p-4 flex justify-between items-center">
                <Link href="/" className="text-white hover:text-gray-300 text-sm">
                    ← Retour à l'accueil
                </Link>
                <div className="flex items-center space-x-2">
                    <span className="text-white text-sm">Déjà membre ?</span>
                    <button
                        onClick={() => router.push('/login')}
                        className="text-white bg-transparent px-4 py-1 rounded hover:bg-blue-700 transition duration-300 border border-gray-500"
                    >
                        Se connecter
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen p-8">
                <div className="w-full max-w-6xl">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img
                            src="/eavest-logo-white.png"
                            alt="Eavest Logo"
                            className="w-64 h-auto max-w-sm"
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 text-sm mb-6 text-center">
                            {error}
                        </p>
                    )}

                    {/* Main Registration Frame */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-8">
                        <form onSubmit={handleRegister}>
                            {/* Three Column Layout */}
                            <div className="flex flex-col lg:flex-row gap-8 mb-8">
                                {/* First Column - Personal Info */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="votre@email.com"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Nom *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nom}
                                            onChange={(e) => handleInputChange('nom', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="Votre nom"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Prénom *
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.prenom}
                                            onChange={(e) => handleInputChange('prenom', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="Votre prénom"
                                            required
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Tél portable *
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.telPortable}
                                            onChange={(e) => handleInputChange('telPortable', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="06 12 34 56 78"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Vertical Separator */}
                                <div className="hidden lg:flex justify-center px-4">
                                    <div className="w-px bg-gray-400 h-full"></div>
                                </div>

                                {/* Second Column - Company Info */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Nom de la société
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nomSociete}
                                            onChange={(e) => handleInputChange('nomSociete', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="Nom de votre société"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Siren
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.siren}
                                            onChange={(e) => handleInputChange('siren', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="123 456 789"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Numéro de téléphone
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.numeroTelephone}
                                            onChange={(e) => handleInputChange('numeroTelephone', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="01 23 45 67 89"
                                        />
                                    </div>
                                </div>

                                {/* Third Column - Address Info */}
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Adresse de la société
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.adresseSociete}
                                            onChange={(e) => handleInputChange('adresseSociete', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="123 Rue de l'Exemple"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Code postal
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.codePostal}
                                            onChange={(e) => handleInputChange('codePostal', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="75001"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Ville
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.ville}
                                            onChange={(e) => handleInputChange('ville', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="Paris"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Pays
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.pays}
                                            onChange={(e) => handleInputChange('pays', e.target.value)}
                                            className="w-full p-3 bg-transparent border border-gray-400 rounded text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                                            placeholder="France"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="propositions"
                                        checked={checkboxes.propositions}
                                        onChange={(e) => handleCheckboxChange('propositions', e.target.checked)}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="propositions" className="text-white text-sm">
                                        Je veux recevoir les propositions d'investissements et lettre hebdomadaire
                                    </label>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="cgu"
                                        checked={checkboxes.cgu}
                                        onChange={(e) => handleCheckboxChange('cgu', e.target.checked)}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-blue-500"
                                        required
                                    />
                                    <label htmlFor="cgu" className="text-white text-sm">
                                        J'ai lu et j'accepte les CGU *
                                    </label>
                                </div>
                                
                                <div className="flex items-start space-x-3">
                                    <input
                                        type="checkbox"
                                        id="doubleAuth"
                                        checked={checkboxes.doubleAuth}
                                        onChange={(e) => handleCheckboxChange('doubleAuth', e.target.checked)}
                                        className="mt-1 w-4 h-4 text-blue-600 bg-transparent border-gray-400 rounded focus:ring-blue-500"
                                    />
                                    <label htmlFor="doubleAuth" className="text-white text-sm">
                                        Je souhaite activer la double authentification
                                    </label>
                                </div>
                            </div>

                            {/* Registration Button */}
                            <button
                                type="submit"
                                className="w-full bg-transparent border border-gray-400 rounded text-white font-medium py-3 px-6 hover:border-blue-400 transition-colors duration-200"
                            >
                                Je m'inscris
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}