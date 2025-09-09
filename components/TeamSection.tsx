// components/TeamSection.tsx
"use client";

import React, { useState } from 'react';
import { Taviraj } from 'next/font/google';
import FranceMap from './FranceMap';
import ConsultantModal from './ConsultantModal';
import { consultantsByRegion, Consultant } from '../app/lib/placeholder-data';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const TeamSection: React.FC = () => {
    const [selectedRegion, setSelectedRegion] = useState<string>('');
    const [selectedConsultant, setSelectedConsultant] = useState<Consultant | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleRegionClick = (regionId: string) => {
        const consultant = consultantsByRegion[regionId];
        if (consultant) {
            setSelectedRegion(regionId);
            setSelectedConsultant(consultant);
            setIsModalOpen(true);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedConsultant(null);
        setSelectedRegion('');
    };

    return (
        <div className="relative bg-black py-16">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left Section - Text Content */}
                    <div className="flex-1 text-white">
                        <h2 className={`text-5xl font-extralight mb-4 ${taviraj.className}`}>
                            Notre équipe
                        </h2>
                        <h3 className="text-2xl text-gray-300 mb-8 font-light">
                            investie dans toutes les régions
                        </h3>
                        
                        <div className="space-y-6 text-lg leading-relaxed text-gray-300">
                            <p>
                                Notre équipe de conseillers financiers experts est présente sur l'ensemble 
                                du territoire français pour vous accompagner dans vos projets d'investissement.
                            </p>
                            <p>
                                Chaque conseiller maîtrise parfaitement les spécificités de sa région et 
                                développe une expertise pointue sur les produits structurés adaptés à votre profil.
                            </p>
                            <p>
                                Découvrez votre conseiller dédié en cliquant sur votre région sur la carte. 
                                Nos experts vous accompagnent avec une approche personnalisée et un suivi 
                                de proximité pour optimiser votre stratégie d'investissement.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mt-12 grid grid-cols-2 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">12</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Régions couvertes
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold text-blue-400 mb-2">15+</div>
                                <div className="text-gray-400 text-sm uppercase tracking-wide">
                                    Conseillers experts
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section - France Map */}
                    <div className="flex-1 max-w-lg">
                        <div className="bg-transparent rounded-lg p-8 shadow-2xl">
                            <FranceMap
                                onRegionClick={handleRegionClick}
                                selectedRegion={selectedRegion}
                                showMiniMap={false}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Consultant Modal */}
            <ConsultantModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                consultant={selectedConsultant}
                selectedRegion={selectedRegion}
            />
        </div>
    );
};

export default TeamSection;