"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { logout } from '../../../utils/auth';
import { 
    ArrowLeftIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    DocumentArrowDownIcon,
    CalendarIcon,
    CurrencyEuroIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    UserIcon,
    CogIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';
import { userPortfolio, currentUser, UserPortfolio, ProductDocument, CouponData } from '../../lib/placeholder-data';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Professional Financial Chart Component
const FinancialChart = ({ data, height = "h-80" }: { data: { date: string; value: number }[]; height?: string }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue || 1;
    const padding = 0; // No padding - grid takes whole space
    
    // Calculate if the trend is positive or negative for color styling
    const firstValue = data[0]?.value || 0;
    const lastValue = data[data.length - 1]?.value || 0;
    const isPositive = lastValue >= firstValue;
    
    // Create points for the line - using full space
    const points = data.map((point, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - ((point.value - minValue) / range) * 100;
        return `${x},${y}`;
    }).join(' ');
    
    // Create area fill points (for gradient fill under the line)
    const areaPoints = `0,100 ` + points + ` 100,100`;
    
    // Generate vertical grid lines
    const verticalGridLines = [];
    const numVerticalLines = 6;
    for (let i = 0; i <= numVerticalLines; i++) {
        const x = (i / numVerticalLines) * 100;
        verticalGridLines.push(x);
    }
    
    // Generate horizontal grid lines
    const horizontalGridLines = [];
    const numHorizontalLines = 4;
    for (let i = 0; i <= numHorizontalLines; i++) {
        const y = (i / numHorizontalLines) * 100;
        horizontalGridLines.push(y);
    }
    
    // Generate Y-axis labels
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
                    {/* Grid Lines */}
                    <defs>
                        {/* Gradient for area fill */}
                        <linearGradient id={`areaGradient-${isPositive ? 'positive' : 'negative'}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor: isPositive ? '#10B981' : '#EF4444', stopOpacity: 0.2}} />
                            <stop offset="100%" style={{stopColor: isPositive ? '#10B981' : '#EF4444', stopOpacity: 0.02}} />
                        </linearGradient>
                    </defs>
                    
                    {/* Vertical grid lines */}
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
                    
                    {/* Horizontal grid lines */}
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
                    
                    {/* Area fill under the line */}
                    <polygon
                        points={areaPoints}
                        fill={`url(#areaGradient-${isPositive ? 'positive' : 'negative'})`}
                    />
                    
                    {/* Main trend line - much thinner */}
                    <polyline
                        fill="none"
                        stroke={isPositive ? '#10B981' : '#EF4444'}
                        strokeWidth="0.8"
                        points={points}
                    />
                    
                    {/* Data points - smaller */}
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
                                {/* Hover point (larger) */}
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
                
                {/* Y-axis labels */}
                <div className="absolute left-2 top-0 h-full flex flex-col justify-between py-4">
                    {yLabels.map((label, index) => (
                        <div key={index} className="text-xs text-gray-600 font-mono">
                            €{label.value}
                        </div>
                    ))}
                </div>
                
                {/* X-axis labels (first and last date) */}
                <div className="absolute bottom-2 left-12 right-12 flex justify-between">
                    <span className="text-xs text-gray-600 font-mono">{data[0]?.date}</span>
                    <span className="text-xs text-gray-600 font-mono">{data[data.length - 1]?.date}</span>
                </div>
                
                {/* Performance indicator */}
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

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const isin = params.isin as string;
    const [documentsOpen, setDocumentsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [navigationStyle, setNavigationStyle] = useState('vertical');

    useEffect(() => {
        const savedNavigationStyle = localStorage.getItem('navigationStyle') || 'vertical';
        setNavigationStyle(savedNavigationStyle);
    }, []);
    
    const portfolioItem = userPortfolio.find(p => p.product.isin === isin);
    
    if (!portfolioItem) {
        return (
            <div 
                className="min-h-screen flex items-center justify-center"
                style={{
                    backgroundImage: "url('/client _background.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-8 hover:bg-white transition-colors duration-300 text-center">
                    <h1 className={`text-3xl font-extralight text-black mb-6 ${taviraj.className}`}>Produit non trouvé</h1>
                    <button 
                        onClick={() => router.back()}
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
                    >
                        Retour
                    </button>
                </div>
            </div>
        );
    }

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

    const getCouponStatusIcon = (status: string) => {
        switch (status) {
            case 'Versé': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
            case 'Prévu': return <ClockIcon className="h-5 w-5 text-yellow-600" />;
            case 'Annulé': return <XCircleIcon className="h-5 w-5 text-red-600" />;
            default: return <ClockIcon className="h-5 w-5 text-gray-600" />;
        }
    };

    const handleDownload = (document: ProductDocument) => {
        window.open(document.url, '_blank');
    };

    return (
        <div 
            className="min-h-screen"
            style={{
                backgroundImage: "url('/client _background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={() => router.back()}
                        className="text-gray-700 hover:text-black transition-colors duration-200"
                        title="Retour"
                    >
                        <ArrowLeftIcon className="h-6 w-6" />
                    </button>
                    <div>
                        <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>{portfolioItem.product.name}</h1>
                        <p className="text-gray-700">ISIN: {portfolioItem.product.isin}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(portfolioItem.detailedStatus)}`}>
                        {portfolioItem.detailedStatus}
                    </span>
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

            <div className="p-8 max-w-7xl mx-auto">
                {/* Performance Chart Section */}
                <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 mb-8 hover:bg-white transition-colors duration-300">
                    <h2 className={`text-3xl font-extralight mb-6 text-black ${taviraj.className}`}>Performance du Produit</h2>
                    <FinancialChart data={portfolioItem.performanceHistory} height="h-96" />
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/50 transition-colors duration-300">
                            <h3 className="text-gray-700 text-sm">Prix d'Achat</h3>
                            <p className="text-xl font-semibold text-black">€{portfolioItem.purchasePrice}</p>
                        </div>
                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/50 transition-colors duration-300">
                            <h3 className="text-gray-700 text-sm">Valeur Actuelle</h3>
                            <p className="text-xl font-semibold text-black">€{portfolioItem.currentValue}</p>
                        </div>
                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/50 transition-colors duration-300">
                            <h3 className="text-gray-700 text-sm">Plus/Moins Value</h3>
                            <p className={`text-xl font-semibold ${portfolioItem.currentValue > portfolioItem.purchasePrice ? 'text-green-600' : 'text-red-600'}`}>
                                {portfolioItem.currentValue > portfolioItem.purchasePrice ? '+' : ''}€{(portfolioItem.currentValue - portfolioItem.purchasePrice).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/50 transition-colors duration-300">
                            <h3 className="text-gray-700 text-sm">Performance</h3>
                            <p className={`text-xl font-semibold ${portfolioItem.currentValue > portfolioItem.purchasePrice ? 'text-green-600' : 'text-red-600'}`}>
                                {portfolioItem.currentValue > portfolioItem.purchasePrice ? '+' : ''}
                                {((portfolioItem.currentValue - portfolioItem.purchasePrice) / portfolioItem.purchasePrice * 100).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                </div>

                {/* Documents Section */}
                <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg mb-8 hover:bg-white transition-colors duration-300">
                    <button
                        onClick={() => setDocumentsOpen(!documentsOpen)}
                        className="w-full flex justify-between items-center p-6 hover:bg-gray-200/50 rounded-lg transition-colors duration-200"
                    >
                        <div className="flex items-center space-x-3">
                            <DocumentArrowDownIcon className="h-6 w-6 text-blue-600" />
                            <span className={`text-black font-extralight text-2xl ${taviraj.className}`}>
                                Documents disponibles ({portfolioItem.documents.length})
                            </span>
                        </div>
                        {documentsOpen ? (
                            <ChevronUpIcon className="h-6 w-6 text-gray-600" />
                        ) : (
                            <ChevronDownIcon className="h-6 w-6 text-gray-600" />
                        )}
                    </button>

                    {documentsOpen && (
                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {portfolioItem.documents.map((doc, index) => (
                                    <div key={index} className="bg-gray-400/15 backdrop-blur-sm rounded-lg p-6 hover:bg-white/50 transition-colors duration-300">
                                        <div className="flex items-center space-x-3 mb-4">
                                            <DocumentArrowDownIcon className="h-8 w-8 text-blue-600" />
                                            <div>
                                                <h4 className="text-black font-semibold">{doc.name}</h4>
                                                <p className="text-gray-700 text-sm">{doc.size}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDownload(doc)}
                                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200"
                                        >
                                            Télécharger
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Coupon History Section */}
                <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg mb-8 hover:bg-white transition-colors duration-300">
                    <div className="p-6">
                        <h2 className={`text-3xl font-extralight mb-6 text-black flex items-center ${taviraj.className}`}>
                            <CalendarIcon className="h-6 w-6 mr-3 text-green-600" />
                            Historique des Coupons
                        </h2>
                        <div className="bg-gray-400/15 backdrop-blur-sm rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-gray-500/20">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase">Date</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase">Taux</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase">Montant</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-black uppercase">Statut</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-300/30">
                                    {portfolioItem.coupons.map((coupon, index) => (
                                        <tr key={index} className="hover:bg-gray-200/50">
                                            <td className="px-6 py-4 text-black">{coupon.date}</td>
                                            <td className="px-6 py-4 text-black font-medium">{coupon.rate}</td>
                                            <td className="px-6 py-4 text-black">€{coupon.amount}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center space-x-2">
                                                    {getCouponStatusIcon(coupon.status)}
                                                    <span className={`font-medium ${
                                                        coupon.status === 'Versé' ? 'text-green-600' :
                                                        coupon.status === 'Prévu' ? 'text-yellow-600' :
                                                        'text-red-600'
                                                    }`}>
                                                        {coupon.status}
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4 bg-gray-400/15 backdrop-blur-sm rounded-lg p-4 hover:bg-white/50 transition-colors duration-300">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Total des coupons versés:</span>
                                <span className="text-black font-semibold text-lg">
                                    €{portfolioItem.coupons.filter(c => c.status === 'Versé').reduce((sum, c) => sum + c.amount, 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Recap Section */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-6 text-white">Récapitulatif du Produit</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column - Product Details */}
                        <div className="space-y-6">
                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Informations Générales</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Émetteur:</span>
                                        <span className="text-white">{portfolioItem.product.issuer}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">ISIN:</span>
                                        <span className="text-white">{portfolioItem.product.isin}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Famille:</span>
                                        <span className="text-white capitalize">{portfolioItem.product.family}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Sous-jacent:</span>
                                        <span className="text-white">{portfolioItem.product.underlying}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Date d'échéance:</span>
                                        <span className="text-white">{portfolioItem.expiryDate}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Votre Position</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Quantité:</span>
                                        <span className="text-white">{portfolioItem.quantity}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Date d'achat:</span>
                                        <span className="text-white">{portfolioItem.purchaseDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Prix d'achat unitaire:</span>
                                        <span className="text-white">€{(portfolioItem.purchasePrice / portfolioItem.quantity).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Valeur actuelle unitaire:</span>
                                        <span className="text-white">€{(portfolioItem.currentValue / portfolioItem.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Characteristics */}
                        <div className="space-y-6">
                            {portfolioItem.product.characteristics && (
                                <div className="bg-gray-800 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-white mb-4">Caractéristiques du Produit</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Devise:</span>
                                            <span className="text-white">{portfolioItem.product.characteristics.devise}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Catégorie:</span>
                                            <span className="text-white">{portfolioItem.product.characteristics.categorie}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Barrière de coupon:</span>
                                            <span className="text-white">{portfolioItem.product.characteristics.barriereCoupon}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Barrière de protection:</span>
                                            <span className="text-white">{portfolioItem.product.characteristics.barriereProtection}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Coupon:</span>
                                            <span className="text-white">{portfolioItem.product.characteristics.coupon}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="bg-gray-800 rounded-lg p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Risques et Observations</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-gray-400 block mb-2">Observations:</span>
                                        <span className="text-white">
                                            {portfolioItem.product.characteristics?.observations || 'Aucune observation particulière'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 block mb-2">Niveau de risque:</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                            portfolioItem.product.family === 'protection' ? 'bg-green-900 text-green-300' :
                                            portfolioItem.product.family === 'autocall' ? 'bg-yellow-900 text-yellow-300' :
                                            'bg-orange-900 text-orange-300'
                                        }`}>
                                            {portfolioItem.product.family === 'protection' ? 'Faible' :
                                             portfolioItem.product.family === 'autocall' ? 'Modéré' : 'Élevé'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}