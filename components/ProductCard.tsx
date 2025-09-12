"use client"; // Mark this as a Client Component

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Product } from '../app/lib/placeholder-data'; // Import the Product type
import { useRouter } from 'next/navigation';

interface ProductCardProps extends Product {}

const ProductCard = ({
                         name,
                         startDate,
                         isin,
                         issuer,
                         underlying,
                         status,
                         family,
                     }: ProductCardProps) => {
    const router = useRouter();

    const handleDiscoverClick = async () => {
        try {
            // Call the backend endpoint first
            const response = await fetch(`/api/products/isin/${encodeURIComponent(isin)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }

            // If successful, navigate to the product page
            router.push(`/nos-produits/${isin}`);
        } catch (error) {
            console.error('Error fetching product details:', error);
            // Still navigate even if API call fails (fallback behavior)
            router.push(`/nos-produits/${isin}`);
        }
    };
    // Get the background color based on the family
    const backgroundColor = {
        autocall: 'bg-white', // White
        cln: 'bg-blue-100', // Light blue
        participation: 'bg-gray-100', // Light grey
        phoenix: 'bg-blue-700', // Blue
        protection: 'bg-gray-500', // Grey
        reverse: 'bg-blue-300', // Dark blue
        undefined: 'bg-gray-900', // Dark grey
    }[family];

    // Get the status image based on the status
    const statusImage = {
        'Not started': '/products/product_status_blue.png', // Replace with your image path
        'Started': '/products/product_status_yellow.png', // Replace with your image path
        'Ended': '/products/product_status_grey.png', // Replace with your image path
        'Reimbursed': '/products/product_status_white.png', // Replace with your image path
    }[status];

    const status_fr = {
        'Not started': 'NON DEMARRE', // Replace with your image path
        'Started': 'EN COURS DE VIE', // Replace with your image path
        'Ended': 'REMBOURSE A SON TERME', // Replace with your image path
        'Reimbursed': 'REMBOURSE PAR ANTICIPATION', // Replace with your image path
    }[status];

    return (
        <div
            className={`${backgroundColor} w-[300px] h-[400px] rounded-lg shadow-lg p-6 flex flex-col space-y-4 hover:bg-[url('/card_background.png')] hover:bg-cover hover:bg-center transition-all duration-300`}
        >
            {/* Name of the product */}
            <h2 className="text-xl font-bold">{name}</h2>

            {/* Starting date */}
            <h1 className="text-gray-700 text-2xl">{startDate}</h1>

            {/* Discover button */}
            <button 
                onClick={handleDiscoverClick}
                className="bg-transparent text-black border border-black px-1 py-0.5 rounded-full hover:bg-gray-900 hover:text-white transition duration-300 whitespace-nowrap"
            >
                <span>Discover</span>
                <span>→</span> {/* Arrow pointing right */}
            </button>

            {/* Bottom section */}
            <div className="mt-auto">
                {/* ISIN, Issuer, and Underlying */}
                <p className="text-lg text-black">{isin}</p>
                <p className="text-lg text-black">{issuer}</p>
                <p className="text-lg text-black whitespace-nowrap">{underlying}</p>

                {/* Status image and text */}
                <div className="flex items-center space-x-2 mt-4">
                    <img
                        src={statusImage}
                        alt={status}
                        className="w-20 h-2"
                    />
                </div>
                <p className="text-lg text-black whitespace-nowrap">{status_fr}</p>
            </div>
        </div>
    );
};

export default ProductCard;
