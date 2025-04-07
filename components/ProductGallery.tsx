// components/ProductGallery.tsx
"use client"; // Mark this as a Client Component

import ProductCard from './ProductCard'; // Import the ProductCard component
import { Product } from '../app/lib/placeholder-data'; // Import the Product type

interface ProductGalleryProps {
    products: Product[]; // Array of products
}

const ProductGallery = ({ products }: ProductGalleryProps) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 mt-8 max-w-screen-lg mx-auto">
            {products.map((product, index) => (
                    <ProductCard
                        key={index}
                name={product.name}
                startDate={product.startDate}
                isin={product.isin}
                issuer={product.issuer}
                underlying={product.underlying}
                status={product.status}
                family={product.family}
    />
))}
    </div>
);
};

export default ProductGallery;