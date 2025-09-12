"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '../../utils/auth';
import { 
    HomeIcon, 
    BriefcaseIcon, 
    ChartBarIcon, 
    DocumentTextIcon,
    ChevronDownIcon,
    UserIcon,
    CogIcon,
    ArrowRightOnRectangleIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    CalendarIcon,
    CurrencyEuroIcon
} from '@heroicons/react/24/outline';
import { currentUser } from '../lib/placeholder-data';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Performance Chart Component
const PerformanceChart = ({ data, title, color }: { data: { month: string; value: number }[]; title: string; color: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    
    const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((point.value - minValue) / range) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
            <h3 className={`text-2xl font-extralight text-black mb-4 ${taviraj.className}`}>{title}</h3>
            <div className="h-40 relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#E5E7EB" strokeWidth="0.5" />
                    ))}
                    {[0, 25, 50, 75, 100].map((x) => (
                        <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#E5E7EB" strokeWidth="0.5" />
                    ))}
                    
                    {/* Chart line */}
                    <polyline
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        points={points}
                    />
                    
                    {/* Data points */}
                    {data.map((point, index) => {
                        const x = (index / (data.length - 1)) * 100;
                        const y = 100 - ((point.value - minValue) / range) * 100;
                        return (
                            <circle
                                key={index}
                                cx={x}
                                cy={y}
                                r="2"
                                fill={color}
                            >
                                <title>{`${point.month}: ${point.value}%`}</title>
                            </circle>
                        );
                    })}
                </svg>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{data[0]?.month}</span>
                <span>{data[data.length - 1]?.month}</span>
            </div>
        </div>
    );
};

export default function StatsPage() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [navigationStyle, setNavigationStyle] = useState('vertical');

    useEffect(() => {
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        const savedNavigationStyle = localStorage.getItem('navigationStyle') || 'vertical';
        setNavigationStyle(savedNavigationStyle);
    }, [router]);

    const navItems = [
        { icon: HomeIcon, label: 'Accueil', active: false, path: '/dashboard' },
        { icon: BriefcaseIcon, label: 'Mon Portefeuille', active: false, path: '/portfolio' },
        { icon: ChartBarIcon, label: 'Mes Stats', active: true, path: '/stats' },
        { icon: DocumentTextIcon, label: 'Documents', active: false, path: '/documents' },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    // Sample stats data
    const monthlyPerformance = [
        { month: 'Jan', value: 2.1 },
        { month: 'Fév', value: 3.2 },
        { month: 'Mar', value: 1.8 },
        { month: 'Avr', value: 4.1 },
        { month: 'Mai', value: 2.9 },
        { month: 'Jun', value: 3.7 },
        { month: 'Jul', value: 5.2 },
        { month: 'Aoû', value: 4.8 },
        { month: 'Sep', value: 3.1 },
        { month: 'Oct', value: 4.3 },
        { month: 'Nov', value: 5.7 },
        { month: 'Déc', value: 6.2 }
    ];

    const yearlyComparison = [
        { month: '2022', value: 12.4 },
        { month: '2023', value: 18.7 },
        { month: '2024', value: 24.1 }
    ];

    const assetAllocation = [
        { name: 'Produits Structurés', percentage: 65, value: 32500, color: '#3B82F6' },
        { name: 'Actions', percentage: 20, value: 10000, color: '#10B981' },
        { name: 'Obligations', percentage: 10, value: 5000, color: '#F59E0B' },
        { name: 'Liquidités', percentage: 5, value: 2500, color: '#EF4444' }
    ];

    const riskMetrics = [
        { label: 'Volatilité', value: '12.4%', trend: 'down', description: '12 mois' },
        { label: 'Sharpe Ratio', value: '1.24', trend: 'up', description: 'Sur 3 ans' },
        { label: 'Beta', value: '0.87', trend: 'neutral', description: 'Vs marché' },
        { label: 'VaR (95%)', value: '€1,247', trend: 'down', description: '1 mois' }
    ];

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
                    <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>Mes Statistiques</h1>
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-gray-900 rounded-full px-6 py-2 flex items-center space-x-3 hover:bg-gray-800 transition-colors duration-200"
                            >
                                <div className="text-right">
                                    <p className="text-white font-medium">{currentUser.name}</p>
                                    <p className="text-gray-300 text-sm">{currentUser.email}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-sm">
                                            {currentUser.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <ChevronDownIcon className={`h-4 w-4 text-gray-300 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                                    <div className="px-4 py-2 border-b border-gray-200">
                                        <p className="font-medium text-gray-900">{currentUser.name}</p>
                                        <p className="text-gray-600 text-sm">{currentUser.email}</p>
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
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                logout();
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

                {/* Stats Content */}
                <div className="p-8">
                    {/* Key Performance Indicators */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Performance YTD</p>
                                    <p className="text-2xl font-bold text-black mt-2">+24.1%</p>
                                </div>
                                <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
                            </div>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Meilleur Produit</p>
                                    <p className="text-2xl font-bold text-black mt-2">+42.7%</p>
                                </div>
                                <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
                            </div>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Pire Produit</p>
                                    <p className="text-2xl font-bold text-black mt-2">-3.2%</p>
                                </div>
                                <ArrowTrendingDownIcon className="h-8 w-8 text-red-500" />
                            </div>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Dividendes Reçus</p>
                                    <p className="text-2xl font-bold text-black mt-2">€2,847</p>
                                </div>
                                <CurrencyEuroIcon className="h-8 w-8 text-blue-500" />
                            </div>
                        </div>
                    </div>

                    {/* Performance Charts */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                        <PerformanceChart 
                            data={monthlyPerformance} 
                            title="Performance Mensuelle 2024" 
                            color="#3B82F6" 
                        />
                        <PerformanceChart 
                            data={yearlyComparison} 
                            title="Comparaison Annuelle" 
                            color="#10B981" 
                        />
                    </div>

                    {/* Asset Allocation and Risk Metrics */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {/* Asset Allocation */}
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h3 className={`text-2xl font-extralight text-black mb-6 ${taviraj.className}`}>Répartition des Actifs</h3>
                            <div className="space-y-4">
                                {assetAllocation.map((asset, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div 
                                                className="w-4 h-4 rounded" 
                                                style={{ backgroundColor: asset.color }}
                                            ></div>
                                            <span className="text-black font-medium">{asset.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-black font-semibold">{asset.percentage}%</p>
                                            <p className="text-gray-600 text-sm">€{asset.value.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            {/* Visual representation */}
                            <div className="mt-6">
                                <div className="flex rounded-lg overflow-hidden h-4">
                                    {assetAllocation.map((asset, index) => (
                                        <div 
                                            key={index}
                                            className="h-full"
                                            style={{ 
                                                backgroundColor: asset.color, 
                                                width: `${asset.percentage}%` 
                                            }}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Risk Metrics */}
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h3 className={`text-2xl font-extralight text-black mb-6 ${taviraj.className}`}>Métriques de Risque</h3>
                            <div className="space-y-6">
                                {riskMetrics.map((metric, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-black font-medium">{metric.label}</h4>
                                            <p className="text-gray-600 text-sm">{metric.description}</p>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xl font-bold text-black">{metric.value}</span>
                                            {metric.trend === 'up' && <ArrowTrendingUpIcon className="h-5 w-5 text-green-500" />}
                                            {metric.trend === 'down' && <ArrowTrendingDownIcon className="h-5 w-5 text-red-500" />}
                                            {metric.trend === 'neutral' && <div className="w-5 h-5 bg-gray-400 rounded-full"></div>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="mt-8 bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                        <h3 className={`text-2xl font-extralight text-black mb-6 ${taviraj.className}`}>Activité Récente</h3>
                        <div className="space-y-4">
                            {[
                                { date: '15 Nov 2024', action: 'Dividende reçu', product: 'Autocall BNP Paribas', amount: '+€125.50' },
                                { date: '10 Nov 2024', action: 'Remboursement', product: 'Phoenix Société Générale', amount: '+€5,000.00' },
                                { date: '05 Nov 2024', action: 'Souscription', product: 'Athena Crédit Agricole', amount: '-€3,000.00' },
                                { date: '28 Oct 2024', action: 'Coupon versé', product: 'Digital Barrier Note', amount: '+€89.75' }
                            ].map((activity, index) => (
                                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-300/30 last:border-b-0">
                                    <div className="flex items-center space-x-4">
                                        <CalendarIcon className="h-5 w-5 text-gray-600" />
                                        <div>
                                            <p className="text-black font-medium">{activity.action}</p>
                                            <p className="text-gray-600 text-sm">{activity.product}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-semibold ${
                                            activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                            {activity.amount}
                                        </p>
                                        <p className="text-gray-600 text-sm">{activity.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}