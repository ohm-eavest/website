
export type Blog = {
    Name: string; // URL of the background image
    Category: string; // Text to display
    Content: string; // Button text
    onButtonClick?: () => void; // Optional button click handler
};

export type Consultant = {
    id: string;
    firstName: string;
    lastName: string;
    jobTitle: string;
    region: string;
    linkedInUrl: string;
    profileImage: string;
    summary: string;
};

export type Product = {
    name: string;
    startDate: string;
    isin: string;
    issuer: string;
    underlying: string;
    status: 'Not started' | 'Started' | 'Ended' | 'Reimbursed';
    family: 'autocall' | 'cln' | 'participation' | 'phoenix' | 'protection' | 'reverse' | 'undefined';
    summary?: string;
    characteristics?: {
        emetteur: string;
        devise: string;
        categorie: string;
        sousJacents: string;
        barriereCoupon: string;
        observations: string;
        coupon: string;
        niveauInitial: string;
        barriereRappel: string;
        barriereProtection: string;
    };
    analyseEavest?: {
        analyseRisque: string;
        analyseTechnique: string;
        analyseMarche: string;
        analysePerformance: string;
        recommandation: string;
    };
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
        family: 'autocall',
        summary: 'Produit structuré autocall offrant une protection du capital avec des coupons conditionnels attractifs.',
        characteristics: {
            emetteur: 'BNP Paribas',
            devise: 'EUR',
            categorie: 'Autocall',
            sousJacents: 'CAC 40',
            barriereCoupon: '65%',
            observations: 'Remboursement anticipé possible',
            coupon: '8.5%',
            niveauInitial: '100%',
            barriereRappel: '100%',
            barriereProtection: '65%'
        },
        analyseEavest: {
            analyseRisque: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            analyseTechnique: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
            analyseMarche: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
            analysePerformance: 'Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.',
            recommandation: 'Ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        }
    },
    {
        name: 'Product 2',
        startDate: 'Fév. 2025',
        isin: 'FR0012345679',
        issuer: 'Issuer B',
        underlying: 'Underlying B',
        status: 'Started',
        family: 'cln',
        summary: 'Note de crédit liée offrant une exposition diversifiée avec protection partielle.',
        characteristics: {
            emetteur: 'Société Générale',
            devise: 'USD',
            categorie: 'Credit Linked Note',
            sousJacents: 'S&P 500',
            barriereCoupon: '70%',
            observations: 'Exposition au risque de crédit',
            coupon: '6.2%',
            niveauInitial: '100%',
            barriereRappel: '95%',
            barriereProtection: '70%'
        },
        analyseEavest: {
            analyseRisque: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra.',
            analyseTechnique: 'Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue.',
            analyseMarche: 'Eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus. Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.',
            analysePerformance: 'Pellentesque fermentum dolor. Aliquam quam lectus, facilisis auctor, ultrices ut, elementum vulputate, nunc. Sed adipiscing ornare risus. Morbi est est, blandit sit amet, sagittis vel, euismod vel, velit. Pellentesque egestas sem. Suspendisse commodo ullamcorper magna.',
            recommandation: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus neque. Nunc dignissim risus id metus. Cras ornare tristique elit. Vivamus vestibulum ntulla nec ante. Praesent placerat risus quis eros.'
        }
    },
    {
        name: 'Product 3',
        startDate: 'Fév. 2025',
        isin: 'FR0012345680',
        issuer: 'Issuer C',
        underlying: 'Underlying C',
        status: 'Ended',
        family: 'participation',
        summary: 'Certificat de participation permettant de bénéficier de la hausse des marchés.',
        characteristics: {
            emetteur: 'Goldman Sachs',
            devise: 'EUR',
            categorie: 'Participation',
            sousJacents: 'EuroStoxx 50',
            barriereCoupon: 'N/A',
            observations: 'Participation à 120%',
            coupon: 'Variable',
            niveauInitial: '100%',
            barriereRappel: 'N/A',
            barriereProtection: '80%'
        },
        analyseEavest: {
            analyseRisque: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
            analyseTechnique: 'Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur. Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse.',
            analyseMarche: 'Quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.',
            analysePerformance: 'Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.',
            recommandation: 'Omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.'
        }
    },
    {
        name: 'Product 4',
        startDate: 'Fév. 2025',
        isin: 'FR0012345681',
        issuer: 'Issuer D',
        underlying: 'Underlying D',
        status: 'Reimbursed',
        family: 'phoenix',
        summary: 'Produit Phoenix avec mécanisme de coupon mémoire et protection du capital.',
        characteristics: {
            emetteur: 'Crédit Agricole',
            devise: 'EUR',
            categorie: 'Phoenix',
            sousJacents: 'Panier d\'actions',
            barriereCoupon: '60%',
            observations: 'Coupon mémoire',
            coupon: '9.5%',
            niveauInitial: '100%',
            barriereRappel: '100%',
            barriereProtection: '60%'
        },
        analyseEavest: {
            analyseRisque: 'Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis.',
            analyseTechnique: 'Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem.',
            analyseMarche: 'At neque quam pellentesque mattis. Cras eget nisi dictum dolor auctor pharetra. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum.',
            analysePerformance: 'Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi.',
            recommandation: 'Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet.'
        }
    },
    {
        name: 'Product 5',
        startDate: 'Fév. 2025',
        isin: 'FR0012345682',
        issuer: 'Issuer E',
        underlying: 'Underlying E',
        status: 'Not started',
        family: 'protection',
        summary: 'Produit à capital protégé offrant une sécurité maximale avec rendement garanti.',
        characteristics: {
            emetteur: 'HSBC',
            devise: 'CHF',
            categorie: 'Protection',
            sousJacents: 'SMI',
            barriereCoupon: '90%',
            observations: 'Capital 100% protégé',
            coupon: '4.8%',
            niveauInitial: '100%',
            barriereRappel: '100%',
            barriereProtection: '100%'
        },
        analyseEavest: {
            analyseRisque: 'Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna. Morbi interdum mollis sapien. Sed ac risus. Phasellus lacinia, magna a ullamcorper laoreet, lectus arcu pulvinar risus, vitae facilisis libero dolor a purus.',
            analyseTechnique: 'Sed vel lacus. Mauris nibh felis, adipiscing varius, adipiscing in, lacinia vel, tellus. Suspendisse ac urna. Etiam pellentesque mauris ut lectus. Nunc tellus ante, mattis eget, gravida vitae, ultricies ac, leo. Integer leo pede, ornare a, lacinia eu, vulputate vel, nisl.',
            analyseMarche: 'Suspendisse mauris. Fusce accumsan mollis eros. Pellentesque a diam sit amet mi ullamcorper vehicula. Integer adipiscing risus a sem. Nullam quis massa sit amet nibh viverra malesuada. Nunc sem lacus, accumsan quis, faucibus non, congue vel, arcu.',
            analysePerformance: 'Et pharetra augue. Nulla mattis imperdiet urna. Suspendisse potenti. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat.',
            recommandation: 'Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus in, imperdiet et, cursus sed, magna. Phasellus eu tellus sit amet tortor gravida placerat. Integer sapien est, iaculis in, pretium quis, viverra ac, nunc.'
        }
    },
    {
        name: 'Product 6',
        startDate: 'Fév. 2025',
        isin: 'FR0012345683',
        issuer: 'Issuer F',
        underlying: 'Underlying F',
        status: 'Started',
        family: 'reverse',
        summary: 'Produit reverse convertible avec coupon élevé et risque de livraison d\'actions.',
        characteristics: {
            emetteur: 'UBS',
            devise: 'EUR',
            categorie: 'Reverse Convertible',
            sousJacents: 'Total SE',
            barriereCoupon: 'N/A',
            observations: 'Risque de livraison',
            coupon: '12.5%',
            niveauInitial: '100%',
            barriereRappel: 'N/A',
            barriereProtection: '75%'
        },
        analyseEavest: {
            analyseRisque: 'Praesent congue erat at massa. Sed cursus turpis a purus. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin orci pede vitae ligula. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla.',
            analyseTechnique: 'Et sollicitudin orci pede vitae ligula. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin orci pede vitae ligula. Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin orci pede vitae ligula.',
            analyseMarche: 'Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.',
            analysePerformance: 'Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.',
            recommandation: 'Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo.'
        }
    },
] as Product[];

export type Alert = {
    id: string;
    type: 'info' | 'warning' | 'success' | 'error';
    title: string;
    message: string;
    date: string;
    isRead: boolean;
};

export type ProductDocument = {
    name: string;
    type: 'term_sheet' | 'remuneration_letter' | 'commercial_brochure';
    url: string;
    size: string;
};

export type PerformanceData = {
    date: string;
    value: number;
};

export type CouponData = {
    date: string;
    rate: string;
    amount: number;
    status: 'Versé' | 'Prévu' | 'Annulé';
};

export type UserPortfolio = {
    product: Product;
    quantity: number;
    purchaseDate: string;
    purchasePrice: number;
    currentValue: number;
    expiryDate: string;
    detailedStatus: 'En cours' | 'À maturité' | 'Rappelé' | 'Remboursé' | 'Suspendu';
    documents: ProductDocument[];
    performanceHistory: PerformanceData[];
    coupons: CouponData[];
    period: string; // Period/term of the product (e.g., "2 ans", "18 mois", "3 ans")
    sousPortefeuille: string; // Sub-portfolio category (e.g., "Croissance", "Protection", "Rendement")
};

export type Advisor = {
    name: string;
    email: string;
    phone: string;
    photo: string;
};

export type User = {
    name: string;
    email: string;
    photo: string;
    advisor: Advisor;
};

export const alerts = [
    {
        id: '1',
        type: 'warning',
        title: 'Produit arrivant à échéance',
        message: 'Votre produit "Product 1" arrive à échéance le 15 Mars 2025',
        date: '2025-01-15',
        isRead: false
    },
    {
        id: '2',
        type: 'info',
        title: 'Nouveau coupon versé',
        message: 'Un coupon de 8.5% a été versé sur votre produit "Product 4"',
        date: '2025-01-10',
        isRead: false
    },
    {
        id: '3',
        type: 'success',
        title: 'Produit remboursé',
        message: 'Votre produit "Product 2" a été remboursé avec succès',
        date: '2025-01-05',
        isRead: true
    }
] as Alert[];

export const userPortfolio = [
    {
        product: products[0],
        quantity: 10,
        purchaseDate: '2024-02-15',
        purchasePrice: 1000,
        currentValue: 1085,
        expiryDate: '2027-02-15',
        detailedStatus: 'En cours',
        documents: [
            { name: 'Term Sheet', type: 'term_sheet', url: '/documents/product1_termsheet.pdf', size: '2.3 MB' },
            { name: 'Lettre de Rémunération', type: 'remuneration_letter', url: '/documents/product1_remuneration.pdf', size: '1.1 MB' },
            { name: 'Brochure Commerciale', type: 'commercial_brochure', url: '/documents/product1_brochure.pdf', size: '4.2 MB' }
        ],
        performanceHistory: [
            { date: '2024-02-15', value: 1000 },
            { date: '2024-03-15', value: 1020 },
            { date: '2024-04-15', value: 995 },
            { date: '2024-05-15', value: 1045 },
            { date: '2024-06-15', value: 1030 },
            { date: '2024-07-15', value: 1065 },
            { date: '2024-08-15', value: 1050 },
            { date: '2024-09-15', value: 1075 },
            { date: '2024-10-15', value: 1090 },
            { date: '2024-11-15', value: 1080 },
            { date: '2024-12-15', value: 1085 }
        ],
        coupons: [
            { date: '2024-08-15', rate: '8.5%', amount: 85, status: 'Versé' },
            { date: '2025-02-15', rate: '8.5%', amount: 85, status: 'Prévu' },
            { date: '2025-08-15', rate: '8.5%', amount: 85, status: 'Prévu' }
        ],
        period: '3 ans',
        sousPortefeuille: 'Croissance'
    },
    {
        product: products[3],
        quantity: 5,
        purchaseDate: '2024-01-20',
        purchasePrice: 500,
        currentValue: 547.5,
        expiryDate: '2026-01-20',
        detailedStatus: 'Rappelé',
        documents: [
            { name: 'Term Sheet', type: 'term_sheet', url: '/documents/product4_termsheet.pdf', size: '1.8 MB' },
            { name: 'Lettre de Rémunération', type: 'remuneration_letter', url: '/documents/product4_remuneration.pdf', size: '0.9 MB' },
            { name: 'Brochure Commerciale', type: 'commercial_brochure', url: '/documents/product4_brochure.pdf', size: '3.1 MB' }
        ],
        performanceHistory: [
            { date: '2024-01-20', value: 500 },
            { date: '2024-02-20', value: 515 },
            { date: '2024-03-20', value: 525 },
            { date: '2024-04-20', value: 535 },
            { date: '2024-05-20', value: 540 },
            { date: '2024-06-20', value: 545 },
            { date: '2024-07-20', value: 550 },
            { date: '2024-08-20', value: 547.5 }
        ],
        coupons: [
            { date: '2024-07-20', rate: '9.5%', amount: 47.5, status: 'Versé' },
            { date: '2025-01-20', rate: '9.5%', amount: 47.5, status: 'Prévu' }
        ],
        period: '2 ans',
        sousPortefeuille: 'Protection'
    },
    {
        product: products[1],
        quantity: 15,
        purchaseDate: '2023-11-10',
        purchasePrice: 1500,
        currentValue: 1620,
        expiryDate: '2025-11-10',
        detailedStatus: 'À maturité',
        documents: [
            { name: 'Term Sheet', type: 'term_sheet', url: '/documents/product2_termsheet.pdf', size: '2.1 MB' },
            { name: 'Lettre de Rémunération', type: 'remuneration_letter', url: '/documents/product2_remuneration.pdf', size: '1.3 MB' }
        ],
        performanceHistory: [
            { date: '2023-11-10', value: 1500 },
            { date: '2023-12-10', value: 1520 },
            { date: '2024-01-10', value: 1535 },
            { date: '2024-02-10', value: 1550 },
            { date: '2024-03-10', value: 1565 },
            { date: '2024-04-10', value: 1580 },
            { date: '2024-05-10', value: 1595 },
            { date: '2024-06-10', value: 1610 },
            { date: '2024-07-10', value: 1620 }
        ],
        coupons: [
            { date: '2024-05-10', rate: '6.2%', amount: 93, status: 'Versé' },
            { date: '2024-11-10', rate: '6.2%', amount: 93, status: 'Versé' },
            { date: '2025-05-10', rate: '6.2%', amount: 93, status: 'Prévu' }
        ],
        period: '2 ans',
        sousPortefeuille: 'Rendement'
    },
    {
        product: products[2],
        quantity: 8,
        purchaseDate: '2023-06-01',
        purchasePrice: 800,
        currentValue: 850,
        expiryDate: '2025-06-01',
        detailedStatus: 'En cours',
        documents: [
            { name: 'Term Sheet', type: 'term_sheet', url: '/documents/product3_termsheet.pdf', size: '1.9 MB' },
            { name: 'Brochure Commerciale', type: 'commercial_brochure', url: '/documents/product3_brochure.pdf', size: '2.8 MB' }
        ],
        performanceHistory: [
            { date: '2023-06-01', value: 800 },
            { date: '2023-07-01', value: 810 },
            { date: '2023-08-01', value: 820 },
            { date: '2023-09-01', value: 815 },
            { date: '2023-10-01', value: 825 },
            { date: '2023-11-01', value: 830 },
            { date: '2023-12-01', value: 835 },
            { date: '2024-01-01', value: 840 },
            { date: '2024-02-01', value: 845 },
            { date: '2024-03-01', value: 850 }
        ],
        coupons: [
            { date: '2024-06-01', rate: '4.8%', amount: 38.4, status: 'Versé' },
            { date: '2024-12-01', rate: '4.8%', amount: 38.4, status: 'Versé' },
            { date: '2025-06-01', rate: '4.8%', amount: 38.4, status: 'Prévu' }
        ],
        period: '2 ans',
        sousPortefeuille: 'Croissance'
    },
    {
        product: products[4],
        quantity: 12,
        purchaseDate: '2022-12-15',
        purchasePrice: 1200,
        currentValue: 1200,
        expiryDate: '2024-12-15',
        detailedStatus: 'Remboursé',
        documents: [
            { name: 'Term Sheet', type: 'term_sheet', url: '/documents/product5_termsheet.pdf', size: '2.0 MB' },
            { name: 'Lettre de Rémunération', type: 'remuneration_letter', url: '/documents/product5_remuneration.pdf', size: '1.2 MB' },
            { name: 'Brochure Commerciale', type: 'commercial_brochure', url: '/documents/product5_brochure.pdf', size: '3.5 MB' }
        ],
        performanceHistory: [
            { date: '2022-12-15', value: 1200 },
            { date: '2023-01-15', value: 1200 },
            { date: '2023-02-15', value: 1200 },
            { date: '2023-03-15', value: 1200 },
            { date: '2023-04-15', value: 1200 },
            { date: '2023-05-15', value: 1200 },
            { date: '2023-06-15', value: 1200 },
            { date: '2023-07-15', value: 1200 },
            { date: '2023-08-15', value: 1200 },
            { date: '2023-09-15', value: 1200 },
            { date: '2023-10-15', value: 1200 },
            { date: '2023-11-15', value: 1200 },
            { date: '2023-12-15', value: 1200 },
            { date: '2024-01-15', value: 1200 }
        ],
        coupons: [
            { date: '2023-06-15', rate: '12.5%', amount: 150, status: 'Versé' },
            { date: '2023-12-15', rate: '12.5%', amount: 150, status: 'Versé' },
            { date: '2024-06-15', rate: '12.5%', amount: 150, status: 'Versé' },
            { date: '2024-12-15', rate: '12.5%', amount: 150, status: 'Versé' }
        ],
        period: '2 ans',
        sousPortefeuille: 'Protection'
    }
] as UserPortfolio[];

export const wishlist = [
    products[1],
    products[2],
    products[4]
] as Product[];

export const currentUser = {
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    photo: '/user-avatar.jpg',
    advisor: {
        name: 'Marie Martin',
        email: 'marie.martin@eavest.com',
        phone: '+33 1 23 45 67 89',
        photo: '/advisor-photo.jpg'
    }
} as User;

export const consultantsByRegion: { [key: string]: Consultant } = {
    'ile-de-france': {
        id: '1',
        firstName: 'Marie',
        lastName: 'Martin',
        jobTitle: 'Conseillère Financière Senior',
        region: 'Île-de-France',
        linkedInUrl: 'https://linkedin.com/in/marie-martin',
        profileImage: '/consultants/marie-martin.jpg',
        summary: 'Spécialisée dans les produits structurés depuis 8 ans, Marie accompagne les investisseurs institutionnels et privés de la région parisienne.'
    },
    'auvergne-rhone-alpes': {
        id: '2',
        firstName: 'Pierre',
        lastName: 'Dubois',
        jobTitle: 'Conseiller Financier',
        region: 'Auvergne-Rhône-Alpes',
        linkedInUrl: 'https://linkedin.com/in/pierre-dubois',
        profileImage: '/consultants/pierre-dubois.jpg',
        summary: 'Expert en investissements alternatifs, Pierre développe notre présence dans la région Rhône-Alpes avec une approche personnalisée.'
    },
    'provence-alpes-cote-azur': {
        id: '3',
        firstName: 'Sophie',
        lastName: 'Lefebvre',
        jobTitle: 'Conseillère Patrimoine',
        region: 'Provence-Alpes-Côte d\'Azur',
        linkedInUrl: 'https://linkedin.com/in/sophie-lefebvre',
        profileImage: '/consultants/sophie-lefebvre.jpg',
        summary: 'Forte de 12 ans d\'expérience en gestion de patrimoine, Sophie conseille une clientèle haut de gamme sur la Côte d\'Azur.'
    },
    'occitanie': {
        id: '4',
        firstName: 'Thomas',
        lastName: 'Moreau',
        jobTitle: 'Conseiller Investissement',
        region: 'Occitanie',
        linkedInUrl: 'https://linkedin.com/in/thomas-moreau',
        profileImage: '/consultants/thomas-moreau.jpg',
        summary: 'Thomas développe notre activité dans le Sud-Ouest avec une expertise particulière sur les produits à capital garanti.'
    },
    'nouvelle-aquitaine': {
        id: '5',
        firstName: 'Claire',
        lastName: 'Bernard',
        jobTitle: 'Conseillère Financière',
        region: 'Nouvelle-Aquitaine',
        linkedInUrl: 'https://linkedin.com/in/claire-bernard',
        profileImage: '/consultants/claire-bernard.jpg',
        summary: 'Spécialisée dans l\'accompagnement des entreprises familiales, Claire apporte son expertise sur toute la région Nouvelle-Aquitaine.'
    }
};

