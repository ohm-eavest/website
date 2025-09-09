// app/dashboard/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    HomeIcon, 
    BriefcaseIcon, 
    ChartBarIcon, 
    DocumentTextIcon,
    BellIcon,
    EnvelopeIcon,
    PhoneIcon,
    HeartIcon,
    UserIcon,
    CogIcon,
    ArrowRightOnRectangleIcon,
    ChevronDownIcon
} from '@heroicons/react/24/outline';
import { alerts, userPortfolio, wishlist, currentUser } from '../lib/placeholder-data';
import { Taviraj } from 'next/font/google';
import { isAuthenticated, getUser, authAPI, User } from '../../utils/auth';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function DashboardPage() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [navigationStyle, setNavigationStyle] = useState('vertical');
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            // Check if the user is authenticated using JWT tokens
            if (!isAuthenticated()) {
                router.push('/login');
                return;
            }

            try {
                // Get user data from localStorage or fetch from API
                let userData = getUser();
                if (!userData) {
                    // If no user data in localStorage, fetch from API
                    userData = await authAPI.getProfile();
                }
                setUser(userData);
            } catch (error) {
                console.error('Authentication check failed:', error);
                router.push('/login');
                return;
            }

            // Load navigation style from localStorage
            const savedNavigationStyle = localStorage.getItem('navigationStyle') || 'vertical';
            setNavigationStyle(savedNavigationStyle);
            setIsLoading(false);
        };

        checkAuthentication();
    }, [router]);

    const navItems = [
        { icon: HomeIcon, label: 'Accueil', active: true, path: '/dashboard' },
        { icon: BriefcaseIcon, label: 'Mon Portefeuille', active: false, path: '/portfolio' },
        { icon: ChartBarIcon, label: 'Mes Stats', active: false, path: '/stats' },
        { icon: DocumentTextIcon, label: 'Documents', active: false, path: '/documents' },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const getAlertIcon = (type: string) => {
        switch (type) {
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            case 'success': return '✅';
            case 'error': return '❌';
            default: return 'ℹ️';
        }
    };

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-white text-xl">Loading...</div>
            </div>
        );
    }

    // Don't render dashboard if user is not loaded
    if (!user) {
        return null;
    }

    return (
        <div 
            className={`min-h-screen ${navigationStyle === 'vertical' ? 'flex' : 'flex flex-col'}`}
            style={{
                backgroundImage: "url('/client _background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Vertical Navigation Panel - Only show in vertical mode */}
            {navigationStyle === 'vertical' && (
                <div className="w-20 bg-gray-900/20 backdrop-blur-sm flex flex-col items-center py-6 space-y-8">
                    <div className="text-white font-bold text-xl">E</div>
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handleNavigation(item.path)}
                            className={`p-3 rounded-lg transition-colors duration-200 ${
                                item.active 
                                    ? 'bg-blue-600 text-white' 
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                            title={item.label}
                        >
                            <item.icon className="h-6 w-6" />
                        </button>
                    ))}
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 text-white">
                {/* Header */}
                <div className="px-8 py-6 flex justify-between items-center">
                    <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>Mon Espace</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-gray-900 rounded-full px-6 py-2 flex items-center space-x-3 hover:bg-gray-800 transition-colors duration-200"
                            >
                                <div className="text-right">
                                    <p className="text-white font-medium">
                                        {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
                                    </p>
                                    <p className="text-gray-300 text-sm">{user?.email || ''}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">
                                            {user ? `${user.first_name[0] || ''}${user.last_name[0] || ''}` : 'U'}
                                        </span>
                                    </div>
                                    <ChevronDownIcon className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="font-medium text-gray-900">
                                            {user ? `${user.first_name} ${user.last_name}` : 'Loading...'}
                                        </p>
                                        <p className="text-gray-600 text-sm">{user?.email || ''}</p>
                                        <p className="text-gray-500 text-xs">{user?.role || ''}</p>
                                    </div>
                                    
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push('/profile');
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                                    >
                                        <UserIcon className="h-5 w-5 text-gray-500" />
                                        <span>Mon Profil</span>
                                    </button>
                                    
                                    <button
                                        onClick={() => {
                                            setIsDropdownOpen(false);
                                            router.push('/settings');
                                        }}
                                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-200"
                                    >
                                        <CogIcon className="h-5 w-5 text-gray-500" />
                                        <span>Paramètres</span>
                                    </button>
                                    
                                    <div className="border-t border-gray-200 mt-2 pt-2">
                                        <button
                                            onClick={async () => {
                                                setIsDropdownOpen(false);
                                                try {
                                                    await authAPI.logout();
                                                } catch (error) {
                                                    console.error('Logout error:', error);
                                                }
                                                router.push('/login');
                                            }}
                                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200"
                                        >
                                            <ArrowRightOnRectangleIcon className="h-5 w-5 text-red-500" />
                                            <span>Se déconnecter</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Horizontal Navigation - Only show in horizontal mode */}
                {navigationStyle === 'horizontal' && (
                    <div className="px-8">
                        <div className="flex items-center space-x-8 py-4 relative">
                            {navItems.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleNavigation(item.path)}
                                    className={`uppercase transition-colors duration-200 relative ${
                                        item.active 
                                            ? 'text-black font-bold' 
                                            : 'text-gray-600 hover:text-black hover:font-semibold'
                                    }`}
                                >
                                    {item.label}
                                    {item.active && (
                                        <div className="absolute -bottom-4 left-0 right-0 h-1 bg-black"></div>
                                    )}
                                </button>
                            ))}
                        </div>
                        <hr className="border-gray-400 mb-8" />
                    </div>
                )}

                {/* Main Content Grid */}
                <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Mes Prochaines Alertes */}
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h2 className={`text-3xl font-extralight mb-4 flex items-center text-black ${taviraj.className}`}>
                                <BellIcon className="h-5 w-5 mr-2 text-yellow-500" />
                                Mes Prochaines Alertes
                            </h2>
                            <div className="space-y-3">
                                {alerts.slice(0, 3).map((alert) => (
                                    <div 
                                        key={alert.id}
                                        className={`p-4 rounded-lg border-l-4 ${
                                            alert.type === 'warning' ? 'bg-yellow-900/20 border-yellow-500' :
                                            alert.type === 'info' ? 'bg-blue-900/20 border-blue-500' :
                                            alert.type === 'success' ? 'bg-green-900/20 border-green-500' :
                                            'bg-red-900/20 border-red-500'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start space-x-3">
                                                <span className="text-lg mt-0.5">{getAlertIcon(alert.type)}</span>
                                                <div>
                                                    <h3 className="font-medium text-black">{alert.title}</h3>
                                                    <p className="text-gray-700 text-sm mt-1">{alert.message}</p>
                                                    <p className="text-gray-600 text-xs mt-2">{alert.date}</p>
                                                </div>
                                            </div>
                                            {!alert.isRead && (
                                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Mon Portefeuille */}
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h2 className={`text-3xl font-extralight mb-4 flex items-center cursor-pointer text-black hover:text-blue-600 transition-colors duration-200 ${taviraj.className}`} onClick={() => handleNavigation('/portfolio')}>
                                <BriefcaseIcon className="h-5 w-5 mr-2 text-green-500" />
                                Mon Portefeuille
                            </h2>
                            <div className="space-y-4">
                                {userPortfolio.map((item, index) => (
                                    <div key={index} className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-black">{item.product.name}</h3>
                                                <p className="text-gray-700 text-sm">{item.product.isin}</p>
                                                <div className="flex space-x-4 mt-2 text-sm">
                                                    <span className="text-gray-800">Qté: {item.quantity}</span>
                                                    <span className="text-gray-800">Achat: {item.purchaseDate}</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-black font-semibold">€{item.currentValue}</div>
                                                <div className={`text-sm ${
                                                    item.currentValue > item.purchasePrice 
                                                        ? 'text-green-400' 
                                                        : 'text-red-400'
                                                }`}>
                                                    {item.currentValue > item.purchasePrice ? '+' : ''}
                                                    {((item.currentValue - item.purchasePrice) / item.purchasePrice * 100).toFixed(1)}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">
                        {/* Mon Conseiller */}
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h2 className={`text-3xl font-extralight mb-4 text-black ${taviraj.className}`}>Mon Conseiller</h2>
                            <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-colors duration-300">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">
                                            {currentUser.advisor.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-black">{currentUser.advisor.name}</h3>
                                        <p className="text-gray-700 text-sm">Conseiller Financier</p>
                                    </div>
                                </div>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center space-x-2 text-gray-800">
                                        <EnvelopeIcon className="h-4 w-4" />
                                        <span className="text-sm">{currentUser.advisor.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2 text-gray-800">
                                        <PhoneIcon className="h-4 w-4" />
                                        <span className="text-sm">{currentUser.advisor.phone}</span>
                                    </div>
                                </div>
                                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                                    <EnvelopeIcon className="h-4 w-4" />
                                    <span>Contacter par email</span>
                                </button>
                            </div>
                        </div>

                        {/* Wishlist */}
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h2 className={`text-3xl font-extralight mb-4 flex items-center text-black ${taviraj.className}`}>
                                <HeartIcon className="h-5 w-5 mr-2 text-red-500" />
                                Ma Wishlist
                            </h2>
                            <div className="space-y-4">
                                {wishlist.slice(0, 3).map((product, index) => (
                                    <div key={index} className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-black">{product.name}</h3>
                                                <p className="text-gray-700 text-sm">{product.issuer}</p>
                                                <p className="text-gray-700 text-sm">{product.isin}</p>
                                                <div className="mt-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        product.status === 'Not started' ? 'bg-blue-900 text-blue-300' :
                                                        product.status === 'Started' ? 'bg-yellow-900 text-yellow-300' :
                                                        product.status === 'Ended' ? 'bg-gray-700 text-gray-300' :
                                                        'bg-green-900 text-green-300'
                                                    }`}>
                                                        {product.status}
                                                    </span>
                                                </div>
                                            </div>
                                            <button className="text-red-500 hover:text-red-400">
                                                <HeartIcon className="h-5 w-5 fill-current" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}