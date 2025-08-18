"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CalendarIcon,
    BanknotesIcon,
    DocumentTextIcon,
    PencilIcon,
    ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { currentUser } from '../lib/placeholder-data';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function ProfilePage() {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        // Check if the user is authenticated
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [router]);

    const handleBack = () => {
        router.push('/dashboard');
    };

    const personalInfo = {
        firstName: currentUser.name.split(' ')[0],
        lastName: currentUser.name.split(' ')[1],
        email: currentUser.email,
        phone: '+33 1 23 45 67 89',
        address: '123 Avenue des Champs-Élysées',
        city: 'Paris',
        postalCode: '75008',
        country: 'France',
        dateOfBirth: '15/03/1985',
        nationality: 'Française',
        occupation: 'Directeur Marketing',
        company: 'Tech Solutions SA'
    };

    const financialInfo = {
        accountNumber: '**** **** **** 1234',
        iban: 'FR76 **** **** **** **** **** 123',
        riskProfile: 'Modéré',
        investmentGoals: 'Croissance à long terme',
        annualIncome: '€85,000 - €100,000',
        netWorth: '€250,000 - €500,000'
    };

    return (
        <div 
            className="min-h-screen flex"
            style={{
                backgroundImage: "url('/client _background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Left Navigation Panel */}
            <div className="w-20 bg-gray-900/20 backdrop-blur-sm flex flex-col items-center py-6">
                <button
                    onClick={handleBack}
                    className="p-3 rounded-lg text-white hover:bg-gray-800/50 transition-colors duration-200"
                    title="Retour au Dashboard"
                >
                    <ArrowLeftIcon className="h-6 w-6" />
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 text-white">
                {/* Header */}
                <div className="px-8 py-6 flex justify-between items-center">
                    <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>Mon Profil</h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="bg-gray-900 rounded-full px-4 py-2 flex items-center space-x-2 text-white hover:bg-gray-800 transition-colors duration-200"
                    >
                        <PencilIcon className="h-4 w-4" />
                        <span>{isEditing ? 'Annuler' : 'Modifier'}</span>
                    </button>
                </div>

                {/* Profile Content */}
                <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Personal Information */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <UserIcon className="h-6 w-6 mr-3 text-blue-500" />
                            Informations Personnelles
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">Prénom</label>
                                    <div className="bg-gray-100/50 rounded p-3 text-black">{personalInfo.firstName}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">Nom</label>
                                    <div className="bg-gray-100/50 rounded p-3 text-black">{personalInfo.lastName}</div>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Email</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black flex items-center">
                                    <EnvelopeIcon className="h-4 w-4 mr-2 text-gray-600" />
                                    {personalInfo.email}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Téléphone</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black flex items-center">
                                    <PhoneIcon className="h-4 w-4 mr-2 text-gray-600" />
                                    {personalInfo.phone}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Adresse</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black flex items-start">
                                    <MapPinIcon className="h-4 w-4 mr-2 mt-1 text-gray-600" />
                                    <div>
                                        <div>{personalInfo.address}</div>
                                        <div>{personalInfo.postalCode} {personalInfo.city}</div>
                                        <div>{personalInfo.country}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">Date de naissance</label>
                                    <div className="bg-gray-100/50 rounded p-3 text-black flex items-center">
                                        <CalendarIcon className="h-4 w-4 mr-2 text-gray-600" />
                                        {personalInfo.dateOfBirth}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">Nationalité</label>
                                    <div className="bg-gray-100/50 rounded p-3 text-black">{personalInfo.nationality}</div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">Profession</label>
                                    <div className="bg-gray-100/50 rounded p-3 text-black">{personalInfo.occupation}</div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-800 mb-1">Entreprise</label>
                                    <div className="bg-gray-100/50 rounded p-3 text-black">{personalInfo.company}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Financial Information */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <BanknotesIcon className="h-6 w-6 mr-3 text-green-500" />
                            Informations Financières
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Numéro de compte</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black">{financialInfo.accountNumber}</div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">IBAN</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black">{financialInfo.iban}</div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Profil de risque</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black">
                                    <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm">
                                        {financialInfo.riskProfile}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Objectifs d'investissement</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black">{financialInfo.investmentGoals}</div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Revenus annuels</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black">{financialInfo.annualIncome}</div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-1">Patrimoine net</label>
                                <div className="bg-gray-100/50 rounded p-3 text-black">{financialInfo.netWorth}</div>
                            </div>
                        </div>
                    </div>

                    {/* Account Information */}
                    <div className="xl:col-span-2 bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <DocumentTextIcon className="h-6 w-6 mr-3 text-purple-500" />
                            Informations du Compte
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-gray-100/50 rounded-lg p-4">
                                <h3 className="font-semibold text-black mb-2">Conseiller Assigné</h3>
                                <p className="text-gray-800">{currentUser.advisor.name}</p>
                                <p className="text-gray-600 text-sm">{currentUser.advisor.email}</p>
                                <p className="text-gray-600 text-sm">{currentUser.advisor.phone}</p>
                            </div>
                            
                            <div className="bg-gray-100/50 rounded-lg p-4">
                                <h3 className="font-semibold text-black mb-2">Date d'ouverture du compte</h3>
                                <p className="text-gray-800">12 janvier 2023</p>
                                <p className="text-gray-600 text-sm">Il y a 1 an et 7 mois</p>
                            </div>
                            
                            <div className="bg-gray-100/50 rounded-lg p-4">
                                <h3 className="font-semibold text-black mb-2">Statut du compte</h3>
                                <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm">
                                    Actif
                                </span>
                                <p className="text-gray-600 text-sm mt-2">Dernière connexion: Aujourd'hui</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}