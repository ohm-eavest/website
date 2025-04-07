
export type Blog = {
    Name: string; // URL of the background image
    Category: string; // Text to display
    Content: string; // Button text
    onButtonClick?: () => void; // Optional button click handler
};

export type Product = {
    name: string;
    startDate: string;
    isin: string;
    issuer: string;
    underlying: string;
    status: 'Not started' | 'Started' | 'Ended' | 'Reimbursed';
    family: 'autocall' | 'cln' | 'participation' | 'phoenix' | 'protection' | 'reverse' | 'undefined';
};


export const blogs = [
    {
        Name: "Pourquoi les investisseurs devraient se soucier de la politique monétaire ?",
        Category: 'Actualites',
        Content: 'La politique monétaire, souvent perçue comme un domaine réservé aux économistes et aux banquiers centraux,',
        onButtonClick: () => {
            console.log('Button clicked!'); // Example function
        },
    },
    {
        Name: "Lettre Annuelle 2024",
        Category: 'Lettre Annuelle',
        Content: 'Alors que 2024 touche à sa fin, nous souhaitons prendre un moment pour vous remercier de votre confiance et de votre collaboration précieuse tout au long de l’année.',
        onButtonClick: () => {
            console.log('Button clicked!'); // Example function
        },
    },
    {
        Name: "FEVRIER 2025",
        Category: 'Performances',
        Content: 'En février 2025, l’économie européenne a montré une faible dynamique, avec une croissance quasi nulle et des signes de stagnation. L’inflation a diminué légèrement à 2,4 %,',
        onButtonClick: () => {
            console.log('Button clicked!'); // Example function
        },
    },
    {
        Name: "Eavest dans Informations Entreprise",
        Category: 'Press',
        Content: 'POUR PLUS D’ANALYSE SUR LES PRODUITS STRUCTURES,\n' +
            '\n' +
            'CONTACTEZ-NOUS !\n' +
            '\n' +
            'contact@eavest.com',
        onButtonClick: () => {
            console.log('Button clicked!'); // Example function
        },
    },
] as Blog[];




export const products = [
    {
        name: 'Product 1',
        startDate: 'Fév. 2025',
        isin: 'FR0012345678',
        issuer: 'Issuer A',
        underlying: 'Underlying A',
        status: 'Not started',
        family: 'autocall', // White background
    },
    {
        name: 'Product 2',
        startDate: 'Fév. 2025',
        isin: 'FR0012345679',
        issuer: 'Issuer B',
        underlying: 'Underlying B',
        status: 'Started',
        family: 'cln', // Light blue background
    },
    {
        name: 'Product 3',
        startDate: 'Fév. 2025',
        isin: 'FR0012345680',
        issuer: 'Issuer C',
        underlying: 'Underlying C',
        status: 'Ended',
        family: 'participation', // Light grey background
    },
    {
        name: 'Product 4',
        startDate: 'Fév. 2025',
        isin: 'FR0012345681',
        issuer: 'Issuer D',
        underlying: 'Underlying D',
        status: 'Reimbursed',
        family: 'phoenix', // Blue background
    },
    {
        name: 'Product 5',
        startDate: 'Fév. 2025',
        isin: 'FR0012345682',
        issuer: 'Issuer E',
        underlying: 'Underlying E',
        status: 'Not started',
        family: 'protection', // Grey background
    },
    {
        name: 'Product 6',
        startDate: 'Fév. 2025',
        isin: 'FR0012345683',
        issuer: 'Issuer F',
        underlying: 'Underlying F',
        status: 'Started',
        family: 'reverse', // Dark blue background
    },
] as Product[];

