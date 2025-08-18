"use client";

import React from 'react';
import Footer from '../../components/Footer';
import ProductCard from '../../components/ProductCard';
import { products } from '../lib/placeholder-data';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Taviraj } from 'next/font/google';

const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function NosProduitsPage() {
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
                                className="flex-1 bg-transparent text-white px-4 py-3 focus:outline-none placeholder-gray-400"
                            />
                            <button className="bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300">
                                Rechercher
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
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Autocall</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Phoenix</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Participation</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Protection</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-white text-lg mb-3">Niveau de Risque</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Faible</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Modéré</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">Élevé</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-white text-lg mb-3">Durée</h3>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">&lt; 1 an</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">1-3 ans</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">3-5 ans</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input type="checkbox" className="mr-3 accent-blue-500" />
                                        <span className="text-gray-300">5+ ans</span>
                                    </label>
                                </div>
                            </div>

                            <button className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300">
                                Effacer les filtres
                            </button>
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-white text-2xl font-semibold">Produits disponibles</h2>
                                <div className="flex items-center space-x-4">
                                    <span className="text-gray-400">Trier par:</span>
                                    <select className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <option>Date de création</option>
                                        <option>Nom</option>
                                        <option>Risque</option>
                                        <option>Durée</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.isin}
                                        {...product}
                                    />
                                ))}
                            </div>
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