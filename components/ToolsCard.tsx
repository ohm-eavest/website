"use client"; // Mark this as a Client Component

interface ToolsCardProps {
    Name: string; // URL of the background image
    Image: string; // Text to display
    buttonText: string; // Button text
    onButtonClick?: () => void; // Optional button click handler
}


const ToolsCard = ({
                         Name,
                         Image,
                         buttonText,
                       onButtonClick,

                     }: ToolsCardProps) => {

    return (
        <div
            className={`w-[300px] h-[450px] rounded-lg shadow-lg p-6 flex flex-col space-y-4 hover:bg-[url('/card_background.png')] hover:bg-cover hover:bg-center transition-all duration-300`}
            style={{ backgroundImage: `url('/tool_background.png')` }}
        >
        {/* Name of the product */}
        <h2 className="text-2xl text-card ">{Name}</h2>



            {/* Bottom section */}
            <div className="mt-auto">
                <div className="transform -translate-y-10">
                    <img
                        src={Image}
                        alt={Name}
                        className="w-2/3 h-auto mx-auto" // Resize to 2/3 width and maintain aspect ratio
                    />
                </div>
                {/* Button */}
                <button
                    onClick={onButtonClick}
                    className="bg-transparent text-white border border-white px-6 py-0.5 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 whitespace-nowrap"

                >
                    <span>{buttonText}</span>
                    <span>→</span> {/* Arrow pointing right */}
                </button>
            </div>
        </div>
    );
};

export default ToolsCard;
