// components/TwoSectionComponent.tsx
"use client"; // Mark this as a Client Component

import { ArrowRightIcon } from '@heroicons/react/24/outline'; // Import an icon for the button

const ProductsIntro = () => {
    return (
        <div className="flex flex-col space-y-8 left-0">
            {/* Top Section */}
            <div className="text-left">
                <h1 className="text-6xl  text-white">
                    15 000 produits structurés analysés
                </h1>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
                    {/* Left Text */}
                    <p className="text-lg text-white max-w-2xl">
                    Chaque produit structuré bénéficie d’un suivi dédié et est accompagné de sa
                documentation complète, assurant une réponse optimale à vos besoins spécifiques.
                </p>

                {/* Right Button */}
                <button className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-1 rounded-full hover:bg-blue-600  hover:text-gray-900 transition duration-300">
                    <span>Découvrir nos produits</span>
                    <ArrowRightIcon className="w-5 h-5" />
                </button>
            </div>
        </div>
);
};

export default ProductsIntro;