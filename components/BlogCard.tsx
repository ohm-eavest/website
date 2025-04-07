"use client"; // Mark this as a Client Component

import { Blog} from '../app/lib/placeholder-data'
interface BlogCardProps  extends Blog {}

const BlogCard = ({
                      Name,
                      Category,
                      Content,
                      onButtonClick,
                  }: BlogCardProps) => {
    // Get the status image based on the status
    const categoryImage = {
        'Lettre Annuelle': '/products/product_status_blue.png', // Replace with your image path
        'Actualites': '/products/product_status_yellow.png', // Replace with your image path
        'Press': '/products/product_status_grey.png', // Replace with your image path
        'Performances': '/products/product_status_white.png', // Replace with your image path
    }[Category];

    return (
        <div
            className={`w-[300px] h-[450px] bg-transparent rounded-lg shadow-lg p-6 flex flex-col space-y-4 border-2 border-blue-200 hover:bg-[url('/card_background.png')] hover:bg-cover hover:bg-center transition-all duration-300`}
        >
            {/* Name of the product */}
            <div className="flex items-center space-x-4"> {/* Add flex and space-x-4 */}
                <img
                    src={categoryImage}
                    alt={Name}
                    className="w-1/3 h-auto" // Resize to 1/3 width and maintain aspect ratio
                />
                <span className="text-xl text-card text-blue-300">{Category}</span>
            </div>

            <h1 className="text-2xl text-card text-white">{Name}</h1>

            <h1 className="text-2xl text-card text-blue-300">{Content}</h1>

            <div className="mt-auto">
                {/* Button */}
                <button
                    onClick={onButtonClick}
                    className="bg-transparent text-white border border-white px-6 py-0.5 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 whitespace-nowrap"
                >
                    <span>{"Lire L'article"}</span>
                    <span>→</span> {/* Arrow pointing right */}
                </button>
            </div>
        </div>
    );
};

export default BlogCard;