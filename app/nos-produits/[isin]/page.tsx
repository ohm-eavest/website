"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Footer from "../../../components/Footer";
import { productAPI } from "../../../utils/auth";
import { Taviraj } from "next/font/google";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const taviraj = Taviraj({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

interface CollapsibleSectionProps {
    title: string;
    content: string;
    isOpen: boolean;
    onToggle: () => void;
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
                                                                   title,
                                                                   content,
                                                                   isOpen,
                                                                   onToggle,
                                                               }) => {
    return (
        <div className="border border-gray-700 rounded-lg mb-4 overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full px-6 py-4 bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex justify-between items-center text-left"
            >
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <div
                    className={`transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                    }`}
                >
                    <ChevronDownIcon className="h-5 w-5 text-white" />
                </div>
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                <div className="px-6 py-4 bg-gray-900 text-gray-300 leading-relaxed">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default function ProductDetailPage() {
    const params = useParams();
    const isin = params.isin as string;
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [product, setProduct] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!isin) return;

            try {
                setLoading(true);
                const data = await productAPI.getProductByIsin(isin);
                setProduct(data);
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(
                    err instanceof Error ? err.message : "Échec du chargement du produit"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [isin]);

    const toggleSection = (sectionKey: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));
    };

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col bg-black text-white">
                <div className="flex-1 flex items-center justify-center">
                    <h1 className="text-2xl">Chargement du produit...</h1>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex min-h-screen flex-col bg-black text-white">
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl mb-4">{error || "Produit non trouvé"}</h1>
                        <a
                            href="/nos-produits"
                            className="text-blue-400 hover:text-blue-300 underline"
                        >
                            Retour à la liste des produits
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col bg-black">
            {/* Navigation */}
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

            {/* Product Header */}
            <div className="bg-gray-900 text-white py-16 mt-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className={`${taviraj.className} text-5xl font-bold mb-6`}>
                            {product.label}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                            ISIN: {product.isin} – Échéance: {product.due_date}
                        </p>
                    </div>
                </div>
            </div>

            {/* Characteristics */}
            <div className="flex-1 bg-black text-white py-12">
                <div className="max-w-7xl mx-auto px-6 space-y-12">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-8 text-center">
                            Caractéristiques du Produit
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Émetteur:</span>
                                    <span>{product.id_prd_currency || "N/A"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Devise:</span>
                                    <span>{product.deliver || "EUR"}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Catégorie:</span>
                                    <span>{product.family}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Sous-jacents:</span>
                                    <span>{product.sousjacents?.join(", ")}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Barrière de coupon:</span>
                                    <span>{product.coupon_barrier}</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Coupon:</span>
                                    <span>{product.coupon}%</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Niveau Initial:</span>
                                    <span>{product.strike}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Barrière de rappel:</span>
                                    <span>{product.autocall_barrier_label}</span>
                                </div>
                                <div className="flex justify-between border-b border-gray-700 pb-2">
                                    <span className="font-medium">Barrière de protection:</span>
                                    <span>{product.protection_barrier_label}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Optional Eavest Analysis */}
                    {product.analyseEavest && (
                        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
                            <h2 className="text-2xl font-semibold mb-8 text-center">
                                Analyse Eavest
                            </h2>
                            <div className="space-y-2">
                                <CollapsibleSection
                                    title="Analyse des Risques"
                                    content={product.analyseEavest.analyseRisque}
                                    isOpen={openSections["risque"] || false}
                                    onToggle={() => toggleSection("risque")}
                                />
                                <CollapsibleSection
                                    title="Analyse Technique"
                                    content={product.analyseEavest.analyseTechnique}
                                    isOpen={openSections["technique"] || false}
                                    onToggle={() => toggleSection("technique")}
                                />
                                <CollapsibleSection
                                    title="Analyse de Marché"
                                    content={product.analyseEavest.analyseMarche}
                                    isOpen={openSections["marche"] || false}
                                    onToggle={() => toggleSection("marche")}
                                />
                                <CollapsibleSection
                                    title="Analyse de Performance"
                                    content={product.analyseEavest.analysePerformance}
                                    isOpen={openSections["performance"] || false}
                                    onToggle={() => toggleSection("performance")}
                                />
                                <CollapsibleSection
                                    title="Recommandation"
                                    content={product.analyseEavest.recommandation}
                                    isOpen={openSections["recommandation"] || false}
                                    onToggle={() => toggleSection("recommandation")}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
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
