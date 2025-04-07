"use client"; // Mark this as a Client Component
import ProductGallery from '../components/ProductGallery'; // Import the ProductGallery component
import ProductCard from '../components/ProductCard';
import {products} from '../app/lib/placeholder-data';
import {blogs} from '../app/lib/placeholder-data'
import ProductsIntro from '../components//ProductsIntro';
import AcmeLogo from '../app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Counter from '../components/counter';
import MethodoSection from "../components/methodologie";
import { Taviraj } from 'next/font/google';
import ToolsCard from "../components/ToolsCard";
import ToolsBand from "../components/ToolsBand";
import BlogSection from "../components/BlogSection";
import Footer from '../components/Footer';
// Configure the Taviraj font
const taviraj = Taviraj({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function Page() {
    // @ts-ignore
    // @ts-ignore
    return (
        <main className="flex min-h-screen flex-col p-6 bg-black">

            {/* Top Left Picture */}
            <div className="relative top-0 left-0 z-40">
                <img
                    src="/design/oversize/PICTOS DESIGN-26.png" // Replace with your image path
                    alt="Top Left Picture"
                    className="w-200 h-200 object-cover object-left-top transform translate-x-[-33%] translate-y-[-20%] brightness-200" // Adjust size as needed
                />

                {/* Second Image (Centered on Top of the First Image) */}
                <div className="realtive -translate-y-130 translate-x-20 inset-0 flex items-center ">
                    <img
                        src="/eavest-logo.svg" // Replace with your second image path
                        alt="Second Image"
                        className="w-100 object-cover " // Adjust size and styling as needed
                    />
                </div>

                <div className="relative right-0 top-70 transform translate-x-200 -translate-y-250 pl-8 space-y-8 z-30 max-w-200">
                    {/* Section 1: Text */}
                    <div className="text-white ">
                        <h1 className={'{taviraj.className} text-6xl '}>Nous sommes Eavest <br/> et les produits structurés <br/>
                            sont notre terrain de jeu.</h1>
                    </div>

                    {/* Section 2: Smaller Text */}
                    <div className="text-white">
                        <p className="text-lg font-dmsans max-w-100">Expert indépendant en conception,
                            suivi et analyse de produits structurés, nous
                            faisons autorité sur le marché depuis 10 ans.</p>
                    </div>

                    {/* Section 3: Buttons */}
                    <div className="flex space-x-4">
                        {/* Button 1: Commencer */}
                        <button className="bg-black text-gray-200 border border-white px-6 py-0.5 rounded-full hover:bg-gray-600   hover:text-gray-100 transition duration-300 whitespace-nowrap">
                            <span>Commencer </span>
                            <span>→</span> {/* Arrow pointing right */}
                        </button>

                        {/* Button 2: Decouvrir notre equipe */}
                        <button className="bg-blue-500 text-black px-6 py-0.5 rounded-full flex items-center space-x-2 hover:bg-blue-600 hover:text-white transition duration-300 whitespace-nowrap">
                            <span>Découvrir notre équipe </span>
                            <span>→</span> {/* Arrow pointing right */}
                        </button>
                    </div>
                </div>

                {/* Centered Vertical Sections */}
                <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-900 shadow-lg rounded-full  flex space-x-6 z-50 whitespace-nowrap items-center">
                    {/* Qui Sommes Nous */}
                    <a
                        href="#qui-sommes-nous"
                        className="text-white hover:text-gray-300 text-sm whitespace-nowrap pl-6 pr-1 py-0.5"
                    >
                        QUI SOMMES-NOUS ?
                    </a>

                    {/* Nos Produits */}
                    <a
                        href="#nos-produits"
                        className="text-white hover:text-gray-300 text-sm whitespace-nowrap px-1 py-0.5"
                    >
                        NOS PRODUITS
                    </a>

                    {/* Eavestpedia */}
                    <a
                        href="#eavestpedia"
                        className="text-white hover:text-gray-300 text-sm whitespace-nowrap px-1 py-0.5"
                    >
                        EAVESTPEDIA
                    </a>

                    {/* Commencer */}
                    <a
                        href="#commencer"
                        className="text-white bg-black rounded-full hover:bg-gray-900 text-sm whitespace-nowrap px-1 py-0.5"
                    >
                        COMMENCER
                    </a>

                    {/* Mon Espace Client */}
                    <a
                        href="/login"
                        className="text-black bg-white pl-1 pr-6 py-0.5 rounded-full rounded-1 hover:bg-gray-100 text-sm whitespace-nowrap"
                    >
                        MON ESPACE
                    </a>
                </nav>

                {/* Bottom Horizontal Sections */}
                <div className="relative right-0 top-70 transform -translate-y-150 bg-black py-6 z-40">
                    <div className="flex justify-center space-x-12">
                        {/* Section 1: Clients */}
                        <div className="flex items-center space-x-4">
                            <Counter target={300} />
                            <span className="text-lg text-white align-super relative top-[-0.5em] font-taviraj">
                                <h1>clients</h1>
                            </span>
                        </div>

                        {/* Yellow Vertical Line */}
                        <div className="w-px h-16 bg-yellow-400"></div>

                        {/* Section 2: Counter 2 */}
                        <div className="flex items-center space-x-4">
                            <Counter target={20} />
                            <span className="text-lg text-white align-super relative top-[-0.5em]">
                            <h1>sales</h1>
                        </span>
                        </div>

                        {/* Yellow Vertical Line */}
                        <div className="w-px h-16 bg-yellow-400"></div>

                        {/* Section 3: Counter 3 */}
                        <div className="flex items-center space-x-4">
                            <Counter target={16000} />
                            <span className="text-lg text-white align-super relative top-[-0.5em]">
                            <h1>produits</h1>
                        </span>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div className="relative right-0 top-70 transform -translate-y-150 z-50">
                    <MethodoSection
                        backgroundImage="/methodo.png" // Replace with your image path
                        title="Une méthode éprouvée et fiable"
                        buttonText="Découvrir notre méthodologie"
                        onButtonClick={() => {
                            // Handle button click
                            console.log('Button clicked!');
                        }}
                    />
                </div>
            </div>

            {/* Products introduction section */}
            <div className="max-w-7xl mx-auto py-12">
                <ProductsIntro />
            </div>

            {/* Gallery of Product Cards */}
            <ProductGallery products={products} />
            <ToolsBand />
            <BlogSection blogs={blogs}/>

            {/* Hero Section */}
            <div className="relative right-0 top-70 transform -translate-y-50 z-50">
                <MethodoSection
                    backgroundImage="/inscription.jpg" // Replace with your image path
                    title="Devenez membre et decouvrez l’expertise Eavest"
                    buttonText="Commencez"
                    onButtonClick={() => {
                        // Handle button click
                        console.log('Button clicked!');
                    }}
                />
            </div>

            <Footer>
                <div className="p-4">
                    <h2 className="text-xl ">Rapport :</h2>
                    <p>
                        <strong>vomme</strong> = MAL
                    </p>
                    <p>
                        <strong>grasp@163</strong>
                    </p>
                </div>
            </Footer>




            {/*
            <div className="flex h-20 shrink-0 items-end rounded-lg bg-black p-4 md:h-52">
                <AcmeLogo />
            </div>
            <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
                <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
                    <div
                        className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
                    />
                    <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
                        <strong>Welcome to Acme.</strong> This is the example for the{' '}
                        <a href="https://nextjs.org/learn/" className="text-blue-500">
                            Next.js Learn Course
                        </a>
                        , brought to you by Vercel.
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
                    >
                        <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
                    </Link>
                </div>
                <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">

                </div>
            </div> */}

        </main>
    );
}
