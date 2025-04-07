import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col transform -translate-y-175">
            {/* Header */}

            {/* Main Content */}
            <main className="flex-grow p-5">{children}</main>

            {/* Footer */}
            <footer className="bg-black text-white p-4">
                <div className="flex justify-between">
                    {/* Left section */}
                    <div className="text-white p-4">
                        <img
                            src="/eavest-logo.svg" // Replace with your second image path
                            alt="Second Image"
                            className="w-40 object-cover " // Adjust size and styling as needed
                        />
                        {/* Line above the first <p> */}
                        <div className="mb-10"></div>
                        <div className="border-t border-white "></div>
                        {/* Text content */}
                        <p>Immatriculé à lOrias n°14001795</p>
                        <p>Conseiller en investissements Financiers enregistré sous le n°E003793</p>
                        <p>Membre de l’ANACOFI - Association agréée par lAMF</p>
                    </div>

                    {/* Middle sections */}
                    <div className="flex space-x-40">
                        {/* Investir Section */}
                        <div>
                            <h2 className="font-bold">Investir</h2>
                            <ul>
                                <li>Ancest</li>
                                <li>CUI</li>
                                <li>Participation</li>
                                <li>Phoenix</li>
                                <li>Protection</li>
                                <li>Revers</li>
                            </ul>
                        </div>

                        {/* Aller plus loin Section */}
                        <div>
                            <h2 className="font-bold">Aller plus loin</h2>
                            <ul>
                                <li>Qui sommes-nous</li>
                                <li>Noto blog</li>
                                <li>Prendre RDV</li>
                                <li>Methodologie</li>
                                <li>Tarifs</li>
                                <li>Contact</li>
                            </ul>
                        </div>

                        {/* Social Media Section */}
                        <div>
                            <h2 className="font-bold">Réseaux sociaux</h2>
                            <ul>
                                <li>Facebook</li>
                                <li>Instagram</li>
                                <li>Twitter</li>
                                <li>LinkedIn</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right section with input */}
                    <div className="flex flex-col items-end space-y-1 space-x-1">
                        <p className="text-white">Recevoir notre newsletter</p>

                        <div className="flex items-center rounded-full border-1 py-0 h-8 border-white">
                            {/* Input box */}
                            <input
                                type="text"
                                placeholder="Votre email"
                                className="p-2   text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Button */}
                            <button className="bg-white text-black  py-0.5 x-10 h-8 rounded-full hover:bg-blue-600 transition duration-300">
                                S'ABONNER
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
