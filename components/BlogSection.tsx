// components/ProductGallery.tsx
"use client"; // Mark this as a Client Component


import BlogCard from "./BlogCard";

import { Blog} from '../app/lib/placeholder-data'
import ProductCard from "./ProductCard";

interface BlogCardsProps {
    blogs: Blog[]; // Array of products
}

const BlogSection = ({ blogs }: BlogCardsProps) => {
    return (


        <div className="relative left-0  bg-black py-12 z-40">
            <div className="flex flex-col space-y-2 left-0 text-left">
                {/* Top Section */}
                <div >
                    <h2 className="text-2xl  text-white transform translate-x-75" >
                        Nos actualites
                    </h2>
                    <h1 className="text-6xl  text-white transform translate-x-75" >
                        Actualités et expertises : <br/> restez maîtres des produits structurés
                    </h1>
                </div>

            </div>

            <div className="grid grid-cols-3 gap-x-4 gap-y-6 mt-8 max-w-screen-lg mx-auto">
                {blogs.map((blog, index) => (
                    <BlogCard
                        key={index}
                        Name={blog.Name}
                        Category={blog.Category}
                        Content={blog.Content}
                        onButtonClick={blog.onButtonClick}
                    />
                ))}
            </div>
        </div>
        );
};

export default BlogSection;