// components/HeroSection.tsx
"use client"; // Mark this as a Client Component

interface InscriptionSectionProps {
    backgroundImage: string; // URL of the background image
    title: string; // Text to display
    buttonText: string; // Button text
    onButtonClick?: () => void; // Optional button click handler
}

const InscriptionSection = ({
                         backgroundImage,
                         title,
                         buttonText,
                         onButtonClick,
                     }: InscriptionSectionProps) => {
    return (
        <div
            className="relative  items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >


            {/* Content */}
            <div className="relative z-10 text-center">
                {/* Title */}
                <p className="text-5xl  text-white mb-8">{title}</p>

                {/* Button */}
                <button
                    onClick={onButtonClick}
                    className="bg-blue-500 text-black px-6 py-0.5 rounded-full hover:bg-blue-600 hover:text-white transition duration-300 whitespace-nowrap"

                >
                    <span>{buttonText}</span>
                    <span>→</span> {/* Arrow pointing right */}
                </button>
            </div>
        </div>
    );
};

export default InscriptionSection;