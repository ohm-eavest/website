// components/ConsultantModal.tsx
"use client";

import React from 'react';
import { Taviraj } from 'next/font/google';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Consultant } from '../app/lib/placeholder-data';
import FranceMap from './FranceMap';

// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

interface ConsultantModalProps {
    isOpen: boolean;
    onClose: () => void;
    consultant: Consultant | null;
    selectedRegion: string;
}

const ConsultantModal: React.FC<ConsultantModalProps> = ({
    isOpen,
    onClose,
    consultant,
    selectedRegion
}) => {
    const [imageError, setImageError] = React.useState(false);
    
    // Reset image error when consultant changes
    React.useEffect(() => {
        setImageError(false);
    }, [consultant?.profileImage]);
    
    if (!isOpen || !consultant) return null;

    const handleLinkedInClick = () => {
        window.open(consultant.linkedInUrl, '_blank');
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-grey backdrop-blur rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 pb-3">
                    <h2 className={`text-3xl font-normal text-white ${taviraj.className}`}>Nos conseillers</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row">
                    {/* Left Column - Consultant Details */}
                    <div className="flex-1 p-6">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">
                                {consultant.region}
                            </h3>
                        </div>

                        <div className="bg-transparent rounded-lg p-6">
                            <div className="flex space-x-6">
                                {/* Left Column - Profile Image */}
                                <div className="flex-shrink-0">
                                    <div className="w-32 h-32 bg-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                                        {imageError ? (
                                            <span className="text-white font-bold text-2xl">
                                                {consultant.firstName[0]}{consultant.lastName[0]}
                                            </span>
                                        ) : (
                                            <img
                                                src={consultant.profileImage}
                                                alt={`${consultant.firstName} ${consultant.lastName}`}
                                                className="w-full h-full object-cover"
                                                onError={() => setImageError(true)}
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Right Column - Consultant Info */}
                                <div className="flex-1">
                                    {/* Name and Job Title */}
                                    <div className="mb-4">
                                        <h4 className="text-xl font-semibold text-white mb-2">
                                            {consultant.firstName} {consultant.lastName}
                                        </h4>
                                        <p className="text-white mb-4">
                                            {consultant.jobTitle}
                                        </p>
                                        
                                        {/* LinkedIn Button */}
                                        <button
                                            onClick={handleLinkedInClick}
                                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                                        >
                                            <svg 
                                                className="w-4 h-4" 
                                                fill="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                            <span>Voir le profil LinkedIn</span>
                                        </button>
                                    </div>

                                    {/* Summary */}
                                    <div>
                                        <h5 className="text-sm font-semibold text-gray-400 mb-2">Présentation</h5>
                                        <p className="text-white text-sm leading-relaxed">
                                            {consultant.summary}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Mini Map */}
                    <div className="lg:w-96 p-6 bg-transparent">
                        <FranceMap
                            onRegionClick={() => {}} // No action needed in modal
                            selectedRegion={selectedRegion}
                            showMiniMap={false}
                            consultantMode={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConsultantModal;