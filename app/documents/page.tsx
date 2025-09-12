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
    DocumentArrowDownIcon,
    FolderIcon,
    CalendarIcon,
    MagnifyingGlassIcon,
    FunnelIcon
} from '@heroicons/react/24/outline';
import { currentUser } from '../lib/placeholder-data';
import { Taviraj } from 'next/font/google';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

interface Document {
    id: string;
    name: string;
    type: string;
    category: string;
    date: string;
    size: string;
    url: string;
    productName?: string;
    description?: string;
}

export default function DocumentsPage() {
    const router = useRouter();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [navigationStyle, setNavigationStyle] = useState('vertical');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Tous');

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
        { icon: ChartBarIcon, label: 'Mes Stats', active: false, path: '/stats' },
        { icon: DocumentTextIcon, label: 'Documents', active: true, path: '/documents' },
    ];

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    // Sample documents data
    const documents: Document[] = [
        {
            id: '1',
            name: 'Contrat de Souscription - Autocall BNP Paribas',
            type: 'PDF',
            category: 'Contrats',
            date: '15 Nov 2024',
            size: '2.3 MB',
            url: '#',
            productName: 'Autocall BNP Paribas',
            description: 'Contrat de souscription initial'
        },
        {
            id: '2',
            name: 'Relevé de Performance Q4 2024',
            type: 'PDF',
            category: 'Rapports',
            date: '10 Nov 2024',
            size: '1.8 MB',
            url: '#',
            description: 'Performance trimestrielle détaillée'
        },
        {
            id: '3',
            name: 'Avis d\'Opération - Phoenix Société Générale',
            type: 'PDF',
            category: 'Notifications',
            date: '05 Nov 2024',
            size: '0.8 MB',
            url: '#',
            productName: 'Phoenix Société Générale',
            description: 'Remboursement anticipé'
        },
        {
            id: '4',
            name: 'Prospectus - Athena Crédit Agricole',
            type: 'PDF',
            category: 'Documentation',
            date: '28 Oct 2024',
            size: '4.1 MB',
            url: '#',
            productName: 'Athena Crédit Agricole',
            description: 'Documentation produit complète'
        },
        {
            id: '5',
            name: 'Relevé Mensuel Octobre 2024',
            type: 'PDF',
            category: 'Relevés',
            date: '01 Nov 2024',
            size: '1.2 MB',
            url: '#',
            description: 'Relevé mensuel de portefeuille'
        },
        {
            id: '6',
            name: 'Conditions Générales Eavest',
            type: 'PDF',
            category: 'Juridique',
            date: '15 Jan 2024',
            size: '3.5 MB',
            url: '#',
            description: 'Conditions générales mises à jour'
        },
        {
            id: '7',
            name: 'Certificat Fiscal 2024',
            type: 'PDF',
            category: 'Fiscalité',
            date: '31 Dec 2023',
            size: '0.9 MB',
            url: '#',
            description: 'Certificat pour déclaration fiscale'
        },
        {
            id: '8',
            name: 'Notice d\'Information - Digital Barrier',
            type: 'PDF',
            category: 'Documentation',
            date: '20 Sep 2024',
            size: '2.1 MB',
            url: '#',
            productName: 'Digital Barrier Note',
            description: 'Notice explicative détaillée'
        }
    ];

    const categories = ['Tous', 'Contrats', 'Rapports', 'Notifications', 'Documentation', 'Relevés', 'Juridique', 'Fiscalité'];

    const filteredDocuments = documents.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (doc.productName && doc.productName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                            (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'Tous' || doc.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleDownload = (document: Document) => {
        // In a real app, this would handle the actual download
        window.open(document.url, '_blank');
    };

    const getDocumentIcon = (type: string) => {
        return <DocumentTextIcon className="h-8 w-8 text-blue-500" />;
    };

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
                    <h1 className={`text-5xl font-extralight text-black ${taviraj.className}`}>Mes Documents</h1>
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

                {/* Documents Content */}
                <div className="p-8">
                    {/* Search and Filter Bar */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 mb-8 hover:bg-white transition-colors duration-300">
                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <MagnifyingGlassIcon className="h-5 w-5 text-gray-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Rechercher dans mes documents..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-white/50 border border-gray-300 rounded-lg text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            
                            {/* Category Filter */}
                            <div className="flex items-center space-x-2">
                                <FunnelIcon className="h-5 w-5 text-gray-600" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-3 py-2 bg-white/50 border border-gray-300 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Documents Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Total Documents</p>
                                    <p className="text-2xl font-bold text-black mt-2">{documents.length}</p>
                                </div>
                                <DocumentTextIcon className="h-8 w-8 text-blue-500" />
                            </div>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Ce Mois</p>
                                    <p className="text-2xl font-bold text-black mt-2">4</p>
                                </div>
                                <CalendarIcon className="h-8 w-8 text-green-500" />
                            </div>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Contrats Actifs</p>
                                    <p className="text-2xl font-bold text-black mt-2">1</p>
                                </div>
                                <FolderIcon className="h-8 w-8 text-orange-500" />
                            </div>
                        </div>
                        <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg p-6 hover:bg-white transition-colors duration-300">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-800 text-sm font-medium">Taille Totale</p>
                                    <p className="text-2xl font-bold text-black mt-2">16.7 MB</p>
                                </div>
                                <DocumentArrowDownIcon className="h-8 w-8 text-purple-500" />
                            </div>
                        </div>
                    </div>

                    {/* Documents List */}
                    <div className="bg-gray-300/20 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white transition-colors duration-300">
                        <div className="px-6 py-4 border-b border-gray-300/30">
                            <h2 className={`text-3xl font-extralight text-black ${taviraj.className}`}>
                                Documents {selectedCategory !== 'Tous' && `- ${selectedCategory}`}
                                {filteredDocuments.length !== documents.length && (
                                    <span className="text-lg text-gray-600 ml-2">
                                        ({filteredDocuments.length} sur {documents.length})
                                    </span>
                                )}
                            </h2>
                        </div>
                        
                        {filteredDocuments.length === 0 ? (
                            <div className="p-12 text-center">
                                <DocumentTextIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun document trouvé</h3>
                                <p className="text-gray-600">
                                    {searchTerm ? 
                                        `Aucun document ne correspond à "${searchTerm}"` : 
                                        `Aucun document dans la catégorie "${selectedCategory}"`
                                    }
                                </p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-300/30">
                                {filteredDocuments.map((doc) => (
                                    <div key={doc.id} className="p-6 hover:bg-gray-200/50 transition-colors duration-200">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start space-x-4">
                                                <div className="flex-shrink-0">
                                                    {getDocumentIcon(doc.type)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-lg font-medium text-black mb-1">{doc.name}</h3>
                                                    {doc.description && (
                                                        <p className="text-gray-600 text-sm mb-2">{doc.description}</p>
                                                    )}
                                                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                        <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                                            {doc.category}
                                                        </span>
                                                        {doc.productName && (
                                                            <span className="text-gray-700">
                                                                Produit: {doc.productName}
                                                            </span>
                                                        )}
                                                        <span>{doc.date}</span>
                                                        <span>{doc.size}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    onClick={() => handleDownload(doc)}
                                                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                                >
                                                    <DocumentArrowDownIcon className="h-4 w-4" />
                                                    <span>Télécharger</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}