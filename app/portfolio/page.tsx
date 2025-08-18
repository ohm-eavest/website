"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
    HomeIcon, 
    BriefcaseIcon, 
    ChartBarIcon, 
    DocumentTextIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    XMarkIcon,
    DocumentArrowDownIcon,
    UserIcon,
    CogIcon,
    ArrowRightOnRectangleIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import { userPortfolio, currentUser, UserPortfolio, ProductDocument } from '../lib/placeholder-data';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Professional Financial Chart Component
const FinancialChart = ({ data, height = "h-64" }: { data: { date: string; value: number }[]; height?: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    
    const firstValue = data[0]?.value || 0;
    const lastValue = data[data.length - 1]?.value || 0;
    const isPositive = lastValue >= firstValue;
    
    const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((point.value - minValue) / range) * 100;
        return `${x},${y}`;
    }).join(' ');
    
    const areaPoints = `0,100 ` + points + ` 100,100`;
    
    const verticalGridLines = [];
    const numVerticalLines = 6;
    for (let i = 0; i <= numVerticalLines; i++) {
        const x = (i / numVerticalLines) * 100;
        verticalGridLines.push(x);
    }
    
    const horizontalGridLines = [];
    const numHorizontalLines = 4;
    for (let i = 0; i <= numHorizontalLines; i++) {
        const y = (i / numHorizontalLines) * 100;
        horizontalGridLines.push(y);
    }
    
    const yLabels = [];
    for (let i = 0; i <= numHorizontalLines; i++) {
        const value = maxValue - (i / numHorizontalLines) * range;
        yLabels.push({
            y: (i / numHorizontalLines) * 100,
            value: Math.round(value)
        });
    }

    return (
        <div className={`w-full ${height} bg-gray-300/20 backdrop-blur-sm rounded-xl border border-gray-300/30 overflow-hidden`}>
            <div className="h-full relative">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id={`areaGradient-${isPositive ? 'positive' : 'negative'}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: isPositive ? '#10B981' : '#EF4444', stopOpacity: 0.2}} />
                            <stop offset="100%" style={{stopColor: isPositive ? '#10B981' : '#EF4444', stopOpacity: 0.02}} />
                        </linearGradient>
                    </defs>
                    
                    {verticalGridLines.map((x, index) => (
                        <line 
                            key={`v-${index}`}
                            x1={x} 
                            y1={0} 
                            x2={x} 
                            y2={100} 
                            stroke="#6B7280" 
                            strokeWidth="0.2"
                            opacity="0.5"
                        />
                    ))}
                    
                    {horizontalGridLines.map((y, index) => (
                        <line 
                            key={`h-${index}`}
                            x1={0} 
                            y1={y} 
                            x2={100} 
                            y2={y} 
                            stroke="#6B7280" 
                            strokeWidth="0.2"
                            opacity="0.5"
                        />
                    ))}
                    
                    <polygon
                        points={areaPoints}
                        fill={`url(#areaGradient-${isPositive ? 'positive' : 'negative'})`}
                    />
                    
                    <polyline
                        fill="none"
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth="0.8"
                        points={points}
                    />
                    
                    {data.map((point, index) => {
                        const x = (index / (data.length - 1)) * 100;
                        const y = 100 - ((point.value - minValue) / range) * 100;
                        return (
                            <g key={index}>
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="0.8"
                                    fill={isPositive ? '#10B981' : '#EF4444'}
                                    stroke="#1F2937"
                                    strokeWidth="0.3"
                                />
                                <circle
                                    cx={x}
                                    cy={y}
                                    r="3"
                                    fill={isPositive ? '#10B981' : '#EF4444'}
                                    opacity="0"
                                    className="hover:opacity-100 transition-opacity duration-200"
                                >
                                    <title>{`${point.date}: €${point.value}`}</title>
                                </circle>
                            </g>
                        );
                    })}
                </svg>
                
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
                    {yLabels.map((label, index) => (
                        <div key={index} className="text-xs text-gray-600 font-mono">
                            €{label.value}
                        </div>
                    ))}
                </div>
                
                <div className="absolute bottom-2 left-12 right-12 flex justify-between">
                    <span className="text-xs text-gray-600 font-mono">{data[0]?.date}</span>
                    <span className="text-xs text-gray-600 font-mono">{data[data.length - 1]?.date}</span>
                </div>
                
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${isPositive ? 'bg-green-400' : 'bg-red-400'}`}></div>
                    <span className={`text-sm font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? '+' : ''}{((lastValue - firstValue) / firstValue * 100).toFixed(1)}%
                    </span>
                </div>
            </div>
        </div>
    );
};

// Product Modal Component
const ProductModal = ({ 
    product, 
    isOpen, 
    onClose 
}: { 
    product: UserPortfolio | null; 
    isOpen: boolean; 
    onClose: () => void;
}) => {
    const [documentsOpen, setDocumentsOpen] = useState(false);

    if (!isOpen || !product) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En cours': return 'bg-green-200 text-green-800 border-green-300';
            case 'À maturité': return 'bg-orange-200 text-orange-800 border-orange-300';
            case 'Rappelé': return 'bg-yellow-200 text-yellow-800 border-yellow-300';
            case 'Remboursé': return 'bg-blue-200 text-blue-800 border-blue-300';
            case 'Suspendu': return 'bg-red-200 text-red-800 border-red-300';
            default: return 'bg-gray-200 text-gray-800 border-gray-300';
        }
    };

    const handleDownload = (document: ProductDocument) => {
        window.open(document.url, '_blank');
    };

    return (
        <div className="fixed inset-0 z-50">
            {/* Background overlay - keeps portfolio page visible */}
            <div className="absolute inset-0" onClick={onClose}></div>
            
            {/* Right side panel */}
            <div className="absolute top-0 right-0 h-full w-1/2 bg-gray-300/20 backdrop-blur-sm border-l border-gray-300/30 overflow-y-auto shadow-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className={`text-3xl font-bold text-black ${taviraj.className}`}>{product.product.name}</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-600 hover:text-black transition-colors duration-200 p-2 hover:bg-white/50 rounded-full"
                        >
                            <XMarkIcon className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(product.detailedStatus)}`}>
                                {product.detailedStatus}
                            </span>
                            <span className="text-gray-700">ISIN: {product.product.isin}</span>
                        </div>

                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-colors duration-300">
                            <h3 className={`text-2xl font-extralight text-black mb-4 ${taviraj.className}`}>Performance</h3>
                            <FinancialChart data={product.performanceHistory} />
                            <div className="mt-4 flex justify-between text-sm text-gray-700">
                                <span>Achat: €{product.purchasePrice}</span>
                                <span>Actuel: €{product.currentValue}</span>
                                <span className={product.currentValue > product.purchasePrice ? 'text-green-600' : 'text-red-600'}>
                                    {product.currentValue > product.purchasePrice ? '+' : ''}
                                    {((product.currentValue - product.purchasePrice) / product.purchasePrice * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>

                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white transition-colors duration-300">
                            <button
                                onClick={() => setDocumentsOpen(!documentsOpen)}
                                className="w-full flex justify-between items-center p-3 hover:bg-gray-200/50 rounded-lg transition-colors duration-200"
                            >
                                <div className="flex items-center space-x-3">
                                    <DocumentArrowDownIcon className="h-5 w-5 text-blue-600" />
                                    <span className="text-black font-medium">
                                        Documents disponibles ({product.documents.length})
                                    </span>
                                </div>
                                {documentsOpen ? (
                                    <ChevronUpIcon className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <ChevronDownIcon className="h-5 w-5 text-gray-600" />
                                )}
                            </button>

                            {documentsOpen && (
                                <div className="mt-4 space-y-3">
                                    {product.documents.map((doc, index) => (
                                        <div key={index} className="flex justify-between items-center p-3 bg-gray-200/30 rounded-lg">
                                            <div>
                                                <h4 className="text-black font-medium">{doc.name}</h4>
                                                <p className="text-gray-700 text-sm">{doc.size}</p>
                                            </div>
                                            <button
                                                onClick={() => handleDownload(doc)}
                                                className="flex items-center space-x-2 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
                                            >
                                                <DocumentArrowDownIcon className="h-4 w-4" />
                                                <span className="text-sm">Télécharger</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={() => window.open(`/portfolio/${product.product.isin}`, '_blank')}
                                className="w-full border-2 text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-50 transition-colors duration-200"
                                style={{ borderColor: 'rgb(229, 243, 62)' }}
                            >
                                Voir le détail
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function PortfolioPage() {
    const router = useRouter();
    const [selectedProduct, setSelectedProduct] = useState<UserPortfolio | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [navigationStyle, setNavigationStyle] = useState('vertical');
    
    // Search and filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('Tous');
    const [periodFilter, setPeriodFilter] = useState('Tous');
    const [sousPortefeuilleFilter, setSousPortefeuilleFilter] = useState('Tous');

    useEffect(() => {
        const isAuthenticated = document.cookie.includes('isAuthenticated=true');
        if (!isAuthenticated) {
            router.push('/login');
        }

        const savedNavigationStyle = localStorage.getItem('navigationStyle') || 'vertical';
        setNavigationStyle(savedNavigationStyle);
    }, [router]);

    const navItems = [
        { icon: HomeIcon, label: 'Accueil', active: false, path: '/dashboard' },
        { icon: BriefcaseIcon, label: 'Mon Portefeuille', active: true, path: '/portfolio' },
        { icon: ChartBarIcon, label: 'Mes Stats', active: false, path: '/stats' },
        { icon: DocumentTextIcon, label: 'Documents', active: false, path: '/documents' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'En cours': return 'bg-green-200 text-green-800 border-green-300';
            case 'À maturité': return 'bg-orange-200 text-orange-800 border-orange-300';
            case 'Rappelé': return 'bg-yellow-200 text-yellow-800 border-yellow-300';
            case 'Remboursé': return 'bg-blue-200 text-blue-800 border-blue-300';
            case 'Suspendu': return 'bg-red-200 text-red-800 border-red-300';
            default: return 'bg-gray-200 text-gray-800 border-gray-300';
        }
    };

    const handleProductClick = (portfolioItem: UserPortfolio) => {
        setSelectedProduct(portfolioItem);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    // Filter options
    const statusOptions = ['Tous', 'En cours', 'À maturité', 'Rappelé', 'Remboursé', 'Suspendu'];
    const periodOptions = ['Tous', ...Array.from(new Set(userPortfolio.map(item => item.period)))];
    const sousPortefeuilleOptions = ['Tous', ...Array.from(new Set(userPortfolio.map(item => item.sousPortefeuille)))];

    // Filter portfolio items
    const filteredPortfolio = userPortfolio.filter(item => {
        const matchesSearch = searchTerm === '' || 
            item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.product.isin.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.product.issuer.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStatus = statusFilter === 'Tous' || item.detailedStatus === statusFilter;
        const matchesPeriod = periodFilter === 'Tous' || item.period === periodFilter;
        const matchesSousPortefeuille = sousPortefeuilleFilter === 'Tous' || item.sousPortefeuille === sousPortefeuilleFilter;
        
        return matchesSearch && matchesStatus && matchesPeriod && matchesSousPortefeuille;
    });

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
                    <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>Mon Portefeuille</h1>
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
                                                document.cookie = 'isAuthenticated=false; path=/';
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

                {/* Portfolio Content */}
                <div className="p-8">
                    {/* Portfolio Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h3 className="text-gray-800 text-sm font-medium">Total des Produits</h3>
                            <p className="text-2xl font-bold text-black mt-2">{userPortfolio.length}</p>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h3 className="text-gray-800 text-sm font-medium">Valeur Totale</h3>
                            <p className="text-2xl font-bold text-black mt-2">
                                €{userPortfolio.reduce((sum, item) => sum + item.currentValue, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h3 className="text-gray-800 text-sm font-medium">Investissement Initial</h3>
                            <p className="text-2xl font-bold text-black mt-2">
                                €{userPortfolio.reduce((sum, item) => sum + item.purchasePrice, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <h3 className="text-gray-800 text-sm font-medium">Plus/Moins Value</h3>
                            <p className={`text-2xl font-bold mt-2 ${
                                userPortfolio.reduce((sum, item) => sum + (item.currentValue - item.purchasePrice), 0) >= 0 
                                    ? 'text-green-600' 
                                    : 'text-red-600'
                            }`}>
                                {userPortfolio.reduce((sum, item) => sum + (item.currentValue - item.purchasePrice), 0) >= 0 ? '+' : ''}
                                €{userPortfolio.reduce((sum, item) => sum + (item.currentValue - item.purchasePrice), 0).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-4 mb-8 hover:bg-white transition-colors duration-300">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Search Box - Takes half the space */}
                            <div className="relative">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un produit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-gray-900 rounded-full px-6 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
                                />
                            </div>

                            {/* Filters - Takes the other half */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Status Filter */}
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-6 py-2 bg-gray-900 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    style={{ colorScheme: 'dark' }}
                                >
                                    {statusOptions.map((status) => (
                                        <option key={status} value={status} className="bg-gray-300/20 text-black">
                                            Statut: {status}
                                        </option>
                                    ))}
                                </select>

                                {/* Period Filter */}
                                <select
                                    value={periodFilter}
                                    onChange={(e) => setPeriodFilter(e.target.value)}
                                    className="px-6 py-2 bg-gray-900 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    style={{ colorScheme: 'dark' }}
                                >
                                    {periodOptions.map((period) => (
                                        <option key={period} value={period} className="bg-gray-300/20 text-black">
                                            Période: {period}
                                        </option>
                                    ))}
                                </select>

                                {/* Sous-Portefeuille Filter */}
                                <select
                                    value={sousPortefeuilleFilter}
                                    onChange={(e) => setSousPortefeuilleFilter(e.target.value)}
                                    className="px-6 py-2 bg-gray-900 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
                                    style={{ colorScheme: 'dark' }}
                                >
                                    {sousPortefeuilleOptions.map((sousPortefeuille) => (
                                        <option key={sousPortefeuille} value={sousPortefeuille} className="bg-gray-300/20 text-black">
                                            Sous-Portefeuille: {sousPortefeuille}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {/* Reset Button */}
                        {(searchTerm || statusFilter !== 'Tous' || periodFilter !== 'Tous' || sousPortefeuilleFilter !== 'Tous') && (
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => {
                                        setSearchTerm('');
                                        setStatusFilter('Tous');
                                        setPeriodFilter('Tous');
                                        setSousPortefeuilleFilter('Tous');
                                    }}
                                    className="text-blue-600 hover:text-blue-800 underline"
                                >
                                    Réinitialiser les filtres
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Portfolio Table */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white transition-colors duration-300">
                        <div className="px-6 py-4 border-b border-gray-300/30">
                            <h2 className={`text-3xl font-extralight text-black ${taviraj.className}`}>Détail des Produits</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-400/15">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Nom du Produit
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            ISIN
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Émetteur
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Date d'Échéance
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Période
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Statut
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Sous-Portefeuille
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Quantité
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Valeur Actuelle
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-medium text-black uppercase tracking-wider">
                                            Performance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300/30">
                                    {filteredPortfolio.map((item, index) => (
                                        <tr 
                                            key={index}
                                            onClick={() => handleProductClick(item)}
                                            className="hover:bg-gray-200/50 cursor-pointer transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-black">{item.product.name}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{item.product.isin}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{item.product.issuer}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{item.expiryDate}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{item.period}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(item.detailedStatus)}`}>
                                                    {item.detailedStatus}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="inline-flex px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                                    {item.sousPortefeuille}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-700">{item.quantity}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-black">€{item.currentValue.toLocaleString()}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className={`text-sm font-medium ${
                                                    item.currentValue > item.purchasePrice ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                    {item.currentValue > item.purchasePrice ? '+' : ''}
                                                    {((item.currentValue - item.purchasePrice) / item.purchasePrice * 100).toFixed(1)}%
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Modal */}
            <ProductModal 
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
}