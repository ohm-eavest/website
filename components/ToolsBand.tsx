// components/ProductGallery.tsx
"use client"; // Mark this as a Client Component


import ToolsCard from "./ToolsCard";



const ToolsBand = () => {
    return (


        <div className="relative right-0  bg-black py-12 z-40">
            <div className="flex flex-col space-y-2 left-0 text-left">
                {/* Top Section */}
                <div >
                    <h1 className="text-6xl  text-white transform translate-x-235" >
                        Nos outils
                    </h1>
                </div>

                {/* Bottom Section */}
                <div className="text-4xl  text-white transform translate-x-235">
                    {/* Left Text */}
                    <p className="text-lg text-white max-w-2xl">
                        Grace aux outils Eavest créez-vous un compte, optimisez votre suivi
                        et vos accompagnements auprès de vos clients.


                    </p>
                </div>
            </div>


            <div className="flex justify-center py-12 space-y-20 space-x-4">
                <ToolsCard
                Name = "Pilotez votre Portefeuille"
                Image = "/design/picto/PICTOS DESIGN-01.png"
                buttonText = "Votre espace personnel"
                onButtonClick={() => {
                    // Handle button click
                    console.log('Button clicked!');
                }}
            />

            <ToolsCard
                Name = "Retrouvez nos 15 000 produits structurés"
                Image = "/design/picto/PICTOS DESIGN-02.png"
                buttonText = "Votre espace personnel"
                onButtonClick={() => {
                    // Handle button click
                    console.log('Button clicked!');
                }}
            />

            <ToolsCard
                Name = "Découvrez la première marketplace dédiée aux produits structurés"
                Image = "/design/picto/PICTOS DESIGN-03.png"
                buttonText = "Votre espace personnel"
                onButtonClick={() => {
                    // Handle button click
                    console.log('Button clicked!');
                }}
            />

            <ToolsCard
                Name = "Développez votre expertise avec notre encyclopédie"
                Image = "/design/picto/PICTOS DESIGN-04.png"
                buttonText = "Votre espace personnel"
                onButtonClick={() => {
                    // Handle button click
                    console.log('Button clicked!');
                }}
            />
            </div>
        </div>
    );
};

export default ToolsBand;