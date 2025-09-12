"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../../utils/auth';
import { 
    CogIcon,
    BellIcon,
    ShieldCheckIcon,
    EyeIcon,
    EyeSlashIcon,
    GlobeAltIcon,
    PaintBrushIcon,
    DocumentTextIcon,
    ArrowLeftIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function SettingsPage() {
    const router = useRouter();
    const [settings, setSettings] = useState({
        // Notification Settings
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true,
        marketAlerts: true,
        portfolioUpdates: true,
        newsUpdates: false,
        
        // Privacy Settings
        profileVisibility: 'private',
        dataSharing: false,
        marketingEmails: false,
        
        // Display Settings
        language: 'fr',
        theme: 'light',
        currency: 'EUR',
        dateFormat: 'DD/MM/YYYY',
        navigationStyle: 'vertical',
        
        // Security Settings
        twoFactorAuth: false,
        sessionTimeout: 30,
        
        // Trading Settings
        riskWarnings: true,
        confirmTrades: true,
        autoInvest: false
    });

    useEffect(() => {
        // Check if the user is authenticated
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        // Load saved navigation style from localStorage
        const savedNavigationStyle = localStorage.getItem('navigationStyle');
        if (savedNavigationStyle) {
            setSettings(prev => ({
                ...prev,
                navigationStyle: savedNavigationStyle
            }));
        }
    }, [router]);

    const handleBack = () => {
        router.push('/dashboard');
    };

    const handleSettingChange = (key: string, value: any) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const saveSettings = () => {
        // Save navigation style to localStorage
        localStorage.setItem('navigationStyle', settings.navigationStyle);
        
        // Here you would typically save all settings to backend
        alert('Paramètres sauvegardés avec succès!');
    };

    const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: (value: boolean) => void }) => (
        <button
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                enabled ? 'bg-blue-600' : 'bg-gray-300'
            }`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );

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
                    <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>Paramètres</h1>
                    <button
                        onClick={saveSettings}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                        <CheckIcon className="h-4 w-4" />
                        <span>Sauvegarder</span>
                    </button>
                </div>

                {/* Settings Content */}
                <div className="p-8 grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {/* Notification Settings */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <BellIcon className="h-6 w-6 mr-3 text-blue-500" />
                            Notifications
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Notifications par email</h3>
                                    <p className="text-gray-700 text-sm">Recevoir des emails pour les mises à jour importantes</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.emailNotifications}
                                    onChange={(value) => handleSettingChange('emailNotifications', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Notifications SMS</h3>
                                    <p className="text-gray-700 text-sm">Recevoir des SMS pour les alertes urgentes</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.smsNotifications}
                                    onChange={(value) => handleSettingChange('smsNotifications', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Notifications push</h3>
                                    <p className="text-gray-700 text-sm">Notifications dans le navigateur</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.pushNotifications}
                                    onChange={(value) => handleSettingChange('pushNotifications', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Alertes de marché</h3>
                                    <p className="text-gray-700 text-sm">Notifications sur les mouvements de marché</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.marketAlerts}
                                    onChange={(value) => handleSettingChange('marketAlerts', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Mises à jour du portefeuille</h3>
                                    <p className="text-gray-700 text-sm">Notifications sur vos investissements</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.portfolioUpdates}
                                    onChange={(value) => handleSettingChange('portfolioUpdates', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Actualités financières</h3>
                                    <p className="text-gray-700 text-sm">Recevoir les dernières nouvelles du marché</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.newsUpdates}
                                    onChange={(value) => handleSettingChange('newsUpdates', value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Security Settings */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <ShieldCheckIcon className="h-6 w-6 mr-3 text-green-500" />
                            Sécurité
                        </h2>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Authentification à deux facteurs</h3>
                                    <p className="text-gray-700 text-sm">Sécurisez votre compte avec la 2FA</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.twoFactorAuth}
                                    onChange={(value) => handleSettingChange('twoFactorAuth', value)}
                                />
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Délai d'expiration de session (minutes)</label>
                                <select 
                                    value={settings.sessionTimeout}
                                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value={15}>15 minutes</option>
                                    <option value={30}>30 minutes</option>
                                    <option value={60}>1 heure</option>
                                    <option value={120}>2 heures</option>
                                </select>
                            </div>
                            
                            <div className="bg-gray-100/50 rounded p-4">
                                <h3 className="font-medium text-black mb-2">Changer le mot de passe</h3>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                                    Modifier le mot de passe
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <EyeIcon className="h-6 w-6 mr-3 text-purple-500" />
                            Confidentialité
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Visibilité du profil</label>
                                <select 
                                    value={settings.profileVisibility}
                                    onChange={(e) => handleSettingChange('profileVisibility', e.target.value)}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value="private">Privé</option>
                                    <option value="public">Public</option>
                                    <option value="advisor-only">Conseiller seulement</option>
                                </select>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Partage de données</h3>
                                    <p className="text-gray-700 text-sm">Autoriser le partage de données anonymisées</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.dataSharing}
                                    onChange={(value) => handleSettingChange('dataSharing', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Emails marketing</h3>
                                    <p className="text-gray-700 text-sm">Recevoir des offres promotionnelles</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.marketingEmails}
                                    onChange={(value) => handleSettingChange('marketingEmails', value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Display Settings */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <PaintBrushIcon className="h-6 w-6 mr-3 text-orange-500" />
                            Affichage
                        </h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Langue</label>
                                <select 
                                    value={settings.language}
                                    onChange={(e) => handleSettingChange('language', e.target.value)}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value="fr">Français</option>
                                    <option value="en">English</option>
                                    <option value="de">Deutsch</option>
                                    <option value="es">Español</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Thème</label>
                                <select 
                                    value={settings.theme}
                                    onChange={(e) => handleSettingChange('theme', e.target.value)}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value="light">Clair</option>
                                    <option value="dark">Sombre</option>
                                    <option value="auto">Automatique</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Devise</label>
                                <select 
                                    value={settings.currency}
                                    onChange={(e) => handleSettingChange('currency', e.target.value)}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value="EUR">Euro (€)</option>
                                    <option value="USD">Dollar US ($)</option>
                                    <option value="GBP">Livre Sterling (£)</option>
                                    <option value="CHF">Franc Suisse (CHF)</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Format de date</label>
                                <select 
                                    value={settings.dateFormat}
                                    onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                </select>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-800 mb-2">Style de navigation</label>
                                <select 
                                    value={settings.navigationStyle}
                                    onChange={(e) => handleSettingChange('navigationStyle', e.target.value)}
                                    className="w-full bg-gray-100/50 rounded p-3 text-black"
                                >
                                    <option value="vertical">Panneau vertical avec icônes</option>
                                    <option value="horizontal">Onglets horizontaux avec texte</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Trading Settings */}
                    <div className="xl:col-span-2 bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h2 className={`text-3xl font-extralight mb-6 flex items-center text-black ${taviraj.className}`}>
                            <DocumentTextIcon className="h-6 w-6 mr-3 text-red-500" />
                            Paramètres de Trading
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Avertissements de risque</h3>
                                    <p className="text-gray-700 text-sm">Afficher les alertes de risque</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.riskWarnings}
                                    onChange={(value) => handleSettingChange('riskWarnings', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Confirmation des trades</h3>
                                    <p className="text-gray-700 text-sm">Demander confirmation avant chaque trade</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.confirmTrades}
                                    onChange={(value) => handleSettingChange('confirmTrades', value)}
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-medium text-black">Investissement automatique</h3>
                                    <p className="text-gray-700 text-sm">Activer les investissements automatiques</p>
                                </div>
                                <ToggleSwitch 
                                    enabled={settings.autoInvest}
                                    onChange={(value) => handleSettingChange('autoInvest', value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}