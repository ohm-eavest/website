"use client";

import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { Product, products as placeholderProducts } from '../lib/placeholder-data';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Taviraj } from 'next/font/google';
import { productAPI, isAuthenticated } from '../../utils/auth';
import { useRouter } from 'next/navigation';

const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function NosProduitsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        categories: [] as string[],
        riskLevels: [] as string[],
        durations: [] as string[]
    });
    const [productsPerPage, setProductsPerPage] = useState(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const router = useRouter();

    const fetchProducts = async (page: number = 1, appliedFilters?: typeof filters, search?: string) => {
            try {
                setLoading(true);
                console.log(`🔄 Fetching page ${page} with ${productsPerPage} products per page`);
                console.log('Applied filters:', appliedFilters);
                console.log('Search term:', search);
                
                // Build filter parameters for Django API
                const filterParams: any = {
                    limit: productsPerPage,
                    offset: (page - 1) * productsPerPage,
                };
                
                // Add search term
                if (search && search.trim()) {
                    filterParams.search = search.trim();
                }
                
                // Add category filters
                if (appliedFilters?.categories && appliedFilters.categories.length > 0) {
                    // Map frontend categories to Django family values
                    const djangoFamilies = appliedFilters.categories.map(cat => {
                        return cat.toLowerCase();
                    });
                    filterParams.family = djangoFamilies.join(',');
                }
                
                console.log('API parameters:', filterParams);
                
                const data = await productAPI.getProducts(filterParams);
                console.log('✅ Django API response:', data);
                console.log('📊 Total products:', data.count);
                console.log('📄 Current page products:', data.results?.length);
                
                // Map Django products to frontend format
                const mappedProducts = data.results?.map((product: any) => ({
                    name: product.label,
                    startDate: new Date(product.launch_date).toLocaleDateString('fr-FR', { 
                        month: 'short', 
                        year: 'numeric' 
                    }),
                    isin: product.isin,
                    issuer: product.emetteur || 'Unknown',
                    underlying: product.sous_jacents || 'Unknown',
                    status: product.status?.code === 'LIVE' || product.family ? 'Started' as const : 'Not started' as const,
                    family: product.family?.toLowerCase() === 'autocall' ? 'autocall' as const :
                           product.family?.toLowerCase() === 'cln' ? 'cln' as const :
                           product.family?.toLowerCase() === 'participation' ? 'participation' as const :
                           product.family?.toLowerCase() === 'phoenix' ? 'phoenix' as const :
                           product.family?.toLowerCase() === 'protection' ? 'protection' as const :
                           product.family?.toLowerCase() === 'reverse convertible' ? 'reverse' as const :
                           'undefined' as const
                })) || [];
                
                setProducts(mappedProducts);
                setTotalProducts(data.count || 0);
                setTotalPages(Math.ceil((data.count || 0) / productsPerPage));
                
                console.log('🎯 State updated - Total Pages:', Math.ceil((data.count || 0) / productsPerPage));
                console.log('🎯 Current Page:', page);
                
            } catch (err) {
                console.error('❌ Error fetching products:', err);
                setError(err instanceof Error ? err.message : 'Failed to load products');
                if (err instanceof Error && err.message === 'Authentication failed') {
                    router.push('/login');
                }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check if user is authenticated
        if (!isAuthenticated()) {
            router.push('/login');
            return;
        }

        fetchProducts(1);  // Always start with page 1 on initial load
    }, [router, productsPerPage]);  // Remove currentPage dependency to avoid infinite loops

    const handleSearch = async () => {
        setCurrentPage(1);
        await fetchProducts(1, filters, searchTerm);
    };

    return (
        <div className="flex min-h-screen flex-col bg-black">
            <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 shadow-lg rounded-full flex space-x-6 z-50 whitespace-nowrap items-center">
                <a
                    href="/#qui-sommes-nous"
                    className="text-white hover:text-gray-300 text-sm whitespace-nowrap pl-6 pr-1 py-0.5"
                >
                    QUI SOMMES-NOUS ?
                </a>
                <a
                    href="/nos-produits"
                    className="text-white hover:text-gray-300 text-sm whitespace-nowrap px-1 py-0.5 bg-gray-700 rounded-full"
                >
                    NOS PRODUITS
                </a>
                <a
                    href="/#eavestpedia"
                    className="text-white hover:text-gray-300 text-sm whitespace-nowrap px-1 py-0.5"
                >
                    EAVESTPEDIA
                </a>
                <a
                    href="/#commencer"
                    className="text-white bg-black rounded-full hover:bg-gray-900 text-sm whitespace-nowrap px-1 py-0.5"
                >
                    COMMENCER
                </a>
                <a
                    href="/login"
                    className="text-black bg-white pl-1 pr-6 py-0.5 rounded-full hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                    MON ESPACE
                </a>
            </nav>

            <div className="bg-gray-900 text-white py-16 mt-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className={`${taviraj.className} text-5xl font-light mb-6`}>
                            Nos Produits Structurés
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                            Découvrez notre gamme complète de produits structurés conçus pour répondre à vos besoins d'investissement. 
                            Chaque produit est analysé et suivi par notre équipe d'experts pour vous offrir les meilleures opportunités du marché.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-black py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="relative max-w-2xl mx-auto">
                        <div className="flex items-center bg-gray-800 rounded-full overflow-hidden">
                            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 ml-4" />
                            <input
                                type="text"
                                placeholder="Rechercher un produit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none placeholder-gray-400"
                            />
                            <button 
                                onClick={handleSearch}
                                disabled={loading}
                                className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Chargement...' : 'Rechercher'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-black">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex gap-8">
                        <div className="w-80 bg-gray-900 rounded-lg p-6">
                            <h2 className="text-white text-xl font-semibold mb-6">Filtres</h2>
                            
                            <div className="mb-6">
                                <h3 className="text-white text-lg mb-3">Catégorie</h3>
                                <div className="space-y-2">
                                    {['Autocall', 'CLN', 'Participation', 'Phoenix', 'Protection', 'Reverse', 'Undefined'].map((category) => (
                                        <label key={category} className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="mr-3 accent-blue-500"
                                                checked={filters.categories.includes(category)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            categories: [...prev.categories, category]
                                                        }));
                                                    } else {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            categories: prev.categories.filter(c => c !== category)
                                                        }));
                                                    }
                                                }}
                                            />
                                            <span className="text-gray-300">{category}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-white text-lg mb-3">Niveau de Risque</h3>
                                <div className="space-y-2">
                                    {['Faible', 'Modéré', 'Élevé'].map((risk) => (
                                        <label key={risk} className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="mr-3 accent-blue-500"
                                                checked={filters.riskLevels.includes(risk)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            riskLevels: [...prev.riskLevels, risk]
                                                        }));
                                                    } else {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            riskLevels: prev.riskLevels.filter(r => r !== risk)
                                                        }));
                                                    }
                                                }}
                                            />
                                            <span className="text-gray-300">{risk}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-white text-lg mb-3">Durée</h3>
                                <div className="space-y-2">
                                    {['< 1 an', '1-3 ans', '3-5 ans', '5+ ans'].map((duration) => (
                                        <label key={duration} className="flex items-center">
                                            <input 
                                                type="checkbox" 
                                                className="mr-3 accent-blue-500"
                                                checked={filters.durations.includes(duration)}
                                                onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            durations: [...prev.durations, duration]
                                                        }));
                                                    } else {
                                                        setFilters(prev => ({
                                                            ...prev,
                                                            durations: prev.durations.filter(d => d !== duration)
                                                        }));
                                                    }
                                                }}
                                            />
                                            <span className="text-gray-300">{duration}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button 
                                    onClick={async () => {
                                        console.log('Applying filters:', filters);
                                        setCurrentPage(1);
                                        await fetchProducts(1, filters, searchTerm);
                                    }}
                                    disabled={loading}
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                                >
                                    {loading ? 'Chargement...' : 'Appliquer les filtres'}
                                </button>
                                <button 
                                    onClick={async () => {
                                        const clearedFilters = {
                                            categories: [],
                                            riskLevels: [],
                                            durations: []
                                        };
                                        setFilters(clearedFilters);
                                        setCurrentPage(1);
                                        await fetchProducts(1, clearedFilters, searchTerm);
                                    }}
                                    className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                                >
                                    Effacer les filtres
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">the model
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-white text-2xl font-semibold">Produits disponibles</h2>
                                <div className="flex items-center space-x-6">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400">Produits par page:</span>
                                        <select 
                                            value={productsPerPage}
                                            onChange={(e) => setProductsPerPage(Number(e.target.value))}
                                            className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value={5}>5</option>
                                            <option value={10}>10</option>
                                            <option value={20}>20</option>
                                            <option value={50}>50</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-400">Trier par:</span>
                                        <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                            <option>Date de création</option>
                                            <option>Nom</option>
                                            <option>Risque</option>
                                            <option>Durée</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {loading ? (
                                    <div className="col-span-full flex justify-center items-center py-12">
                                        <div className="text-white text-xl">Chargement des produits...</div>
                                    </div>
                                ) : error ? (
                                    <div className="col-span-full flex justify-center items-center py-12">
                                        <div className="text-red-500 text-xl">Erreur: {error}</div>
                                    </div>
                                ) : products.length === 0 ? (
                                    <div className="col-span-full flex justify-center items-center py-12">
                                        <div className="text-gray-400 text-xl">Aucun produit trouvé</div>
                                    </div>
                                ) : (
                                    products.map((product) => (
                                        <ProductCard
                                            key={product.isin}
                                            {...product}
                                        />
                                    ))
                                )}
                            </div>
                            
                            {/* Pagination Controls */}
                            {totalProducts > productsPerPage && (
                                <div className="flex justify-center items-center mt-8 space-x-2 relative z-10">
                                    {/* First Page */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log('🎯 FIRST PAGE CLICKED!');
                                            if (currentPage !== 1) {
                                                setCurrentPage(1);
                                                fetchProducts(1, filters, searchTerm);
                                            }
                                        }}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer z-20"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        ≪≪
                                    </button>
                                    
                                    {/* Previous Page */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log('🎯 PREVIOUS PAGE CLICKED!');
                                            if (currentPage > 1) {
                                                const newPage = currentPage - 1;
                                                setCurrentPage(newPage);
                                                fetchProducts(newPage, filters, searchTerm);
                                            }
                                        }}
                                        disabled={currentPage === 1}
                                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer z-20"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        ≪
                                    </button>
                                    
                                    {/* Previous 5 Pages */}
                                    {currentPage > 6 && (
                                        <button
                                            onClick={async () => {
                                                const newPage = Math.max(1, currentPage - 5);
                                                setCurrentPage(newPage);
                                                await fetchProducts(newPage, filters, searchTerm);
                                            }}
                                            className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                                        >
                                            -5
                                        </button>
                                    )}
                                    
                                    {/* Page Numbers */}
                                    {(() => {
                                        const pageNumbers = [];
                                        const startPage = Math.max(1, currentPage - 2);
                                        const endPage = Math.min(totalPages, currentPage + 2);
                                        
                                        for (let i = startPage; i <= endPage; i++) {
                                            pageNumbers.push(
                                                <button
                                                    key={i}
                                                    onClick={async () => {
                                                        console.log(`🔢 Page ${i} clicked (current: ${currentPage})`);
                                                        setCurrentPage(i);
                                                        await fetchProducts(i, filters, searchTerm);
                                                    }}
                                                    className={`px-3 py-2 rounded-lg ${
                                                        i === currentPage 
                                                            ? 'bg-blue-600 text-white' 
                                                            : 'bg-gray-800 text-white hover:bg-gray-700'
                                                    }`}
                                                >
                                                    {i}
                                                </button>
                                            );
                                        }
                                        return pageNumbers;
                                    })()}
                                    
                                    {/* Next 5 Pages */}
                                    {(() => {
                                        return currentPage <= totalPages - 6 && (
                                            <button
                                                onClick={async () => {
                                                    const newPage = Math.min(totalPages, currentPage + 5);
                                                    setCurrentPage(newPage);
                                                    await fetchProducts(newPage, filters, searchTerm);
                                                }}
                                                className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                                            >
                                                +5
                                            </button>
                                        );
                                    })()}
                                    
                                    {/* Next Page */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log('🎯 NEXT PAGE CLICKED!');
                                            if (currentPage < totalPages) {
                                                const newPage = currentPage + 1;
                                                setCurrentPage(newPage);
                                                fetchProducts(newPage, filters, searchTerm);
                                            }
                                        }}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer z-20"
                                        style={{ pointerEvents: 'auto' }}
                                    >
                                        ≫
                                    </button>
                                    
                                    {/* Last Page */}
                                    <button
                                        onClick={async () => {
                                            setCurrentPage(totalPages);
                                            await fetchProducts(totalPages, filters, searchTerm);
                                        }}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        ≫≫
                                    </button>
                                    
                                    {/* Page Info */}
                                    <span className="text-white ml-4">
                                        Page {currentPage} sur {totalPages} 
                                        ({totalProducts} produits)
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer>
                <div className="p-4">
                    <h2 className="text-xl">Rapport :</h2>
                    <p>
                        <strong>vomme</strong> = MAL
                    </p>
                    <p>
                        <strong>grasp@163</strong>
                    </p>
                </div>
            </Footer>
        </div>
    );
}