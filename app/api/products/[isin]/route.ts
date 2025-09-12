import { NextRequest, NextResponse } from 'next/server';

// Types for Django backend response
interface DjangoPrdProduct {
    id: number;
    label: string;
    isin: string;
    deliver: string;
    family: string;
    category: string;
    launch_date: string;
    due_date: string;
    coupon: number;
    coupon_year: number;
    capital_protection: number;
    protection_barrier: number;
    coupon_barrier: number;
    reimbursement_barrier: number;
    id_prd_status: number;
    capital_guaranteed: boolean;
    performance: number;
    // Add more fields as needed for detailed view
}

interface DjangoPrdStatus {
    id: number;
    code: string;
    description: string;
}

interface DjangoDeliverTable {
    id: number;
    deliver: string;
    groups: string;
    nationality: string;
}

interface DjangoPrdSousjacent {
    id: number;
    label: string;
    type: string;
}

// Map Django backend fields to frontend Product type with full details
function mapDjangoProductToFrontendDetailed(
    djangoProduct: DjangoPrdProduct, 
    status?: DjangoPrdStatus,
    deliver?: DjangoDeliverTable,
    sousjacents?: DjangoPrdSousjacent[]
) {
    // Map family to match frontend enum
    const familyMap: { [key: string]: string } = {
        'Autocall': 'autocall',
        'CLN': 'cln', 
        'Participation': 'participation',
        'Phoenix': 'phoenix',
        'Protection': 'protection',
        'Reverse Convertible': 'reverse'
    };

    // Map status to match frontend enum
    const statusMap: { [key: string]: string } = {
        'LIVE': 'Started',
        'ENDED': 'Ended', 
        'SUBSCR': 'Not started',
        'REIMB': 'Reimbursed'
    };

    const mappedFamily = familyMap[djangoProduct.family] || 'undefined';
    const mappedStatus = status ? (statusMap[status.code] || 'Not started') : 'Not started';

    // Format launch date to match frontend format
    const launchDate = new Date(djangoProduct.launch_date);
    const monthNames = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai', 'Juin', 
                       'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
    const formattedDate = `${monthNames[launchDate.getMonth()]} ${launchDate.getFullYear()}`;

    // Build underlying string from sousjacents
    const underlyingString = sousjacents && sousjacents.length > 0 
        ? sousjacents.map(s => s.label).join(', ')
        : djangoProduct.category || 'Unknown';

    const baseProduct = {
        name: djangoProduct.label,
        startDate: formattedDate,
        isin: djangoProduct.isin,
        issuer: deliver?.deliver || djangoProduct.deliver || 'Unknown',
        underlying: underlyingString,
        status: mappedStatus as 'Not started' | 'Started' | 'Ended' | 'Reimbursed',
        family: mappedFamily as 'autocall' | 'cln' | 'participation' | 'phoenix' | 'protection' | 'reverse' | 'undefined',
        summary: `Produit structuré ${djangoProduct.family.toLowerCase()} avec coupon de ${djangoProduct.coupon_year}% annuel.`
    };

    // Add detailed characteristics if available
    if (djangoProduct.coupon !== undefined) {
        return {
            ...baseProduct,
            characteristics: {
                emetteur: deliver?.deliver || djangoProduct.deliver || 'Unknown',
                devise: 'EUR', // Default, could be mapped from currency table
                categorie: djangoProduct.family,
                sousJacents: underlyingString,
                barriereCoupon: djangoProduct.coupon_barrier ? `${Math.round(djangoProduct.coupon_barrier * 100)}%` : 'N/A',
                observations: djangoProduct.capital_guaranteed ? 'Capital garanti' : 'Capital non garanti',
                coupon: `${djangoProduct.coupon_year}%`,
                niveauInitial: '100%',
                barriereRappel: djangoProduct.reimbursement_barrier ? `${Math.round(djangoProduct.reimbursement_barrier * 100)}%` : 'N/A',
                barriereProtection: djangoProduct.protection_barrier ? `${Math.round(djangoProduct.protection_barrier * 100)}%` : 'N/A'
            },
            analyseEavest: {
                analyseRisque: 'Analyse des risques en cours de développement avec les données réelles du produit.',
                analyseTechnique: 'Analyse technique en cours de développement avec les données réelles du produit.',
                analyseMarche: 'Analyse de marché en cours de développement avec les données réelles du produit.',
                analysePerformance: 'Analyse de performance en cours de développement avec les données réelles du produit.',
                recommandation: 'Recommandation en cours de développement avec les données réelles du produit.'
            }
        };
    }

    return baseProduct;
}

export async function GET(
    request: NextRequest,
    { params }: { params: { isin: string } }
) {
    try {
        const { isin } = params;

        if (!isin) {
            return NextResponse.json(
                { error: 'ISIN parameter is required' },
                { status: 400 }
            );
        }

        // Construct API URL for Django backend
        const backendBaseUrl = process.env.DJANGO_BACKEND_URL || 'http://localhost:8000';
        const apiUrl = `${backendBaseUrl}/api/products/${encodeURIComponent(isin)}/`;

        // Build headers with authentication
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Add authentication if configured
        if (process.env.DJANGO_API_TOKEN) {
            headers['Authorization'] = `Bearer ${process.env.DJANGO_API_TOKEN}`;
        }

        // For session-based auth, you might need:
        if (process.env.DJANGO_SESSION_KEY) {
            headers['Cookie'] = `sessionid=${process.env.DJANGO_SESSION_KEY}`;
        }

        // For basic auth:
        if (process.env.DJANGO_USERNAME && process.env.DJANGO_PASSWORD) {
            const credentials = Buffer.from(
                `${process.env.DJANGO_USERNAME}:${process.env.DJANGO_PASSWORD}`
            ).toString('base64');
            headers['Authorization'] = `Basic ${credentials}`;
        }

        // Fetch from Django backend
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers,
            cache: 'no-store' // Always fetch fresh data
        });

        if (!response.ok) {
            if (response.status === 404) {
                return NextResponse.json(
                    { error: 'Product not found' },
                    { status: 404 }
                );
            }
            throw new Error(`Django API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Map Django product to frontend format with full details
        const mappedProduct = mapDjangoProductToFrontendDetailed(
            data.product,
            data.status,
            data.deliver,
            data.sousjacents
        );

        return NextResponse.json({
            product: mappedProduct
        });

    } catch (error) {
        console.error(`Error fetching product ${params.isin} from Django backend:`, error);
        
        // Return error response
        return NextResponse.json(
            { 
                error: 'Failed to fetch product',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}