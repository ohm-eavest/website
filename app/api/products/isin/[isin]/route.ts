import { NextRequest, NextResponse } from 'next/server';

// Types for Django backend response matching PrdProduct model
interface DjangoPrdProduct {
    id: number;
    created_at?: string;
    created_by?: number;
    updated_at?: string;
    updated_by?: number;
    airbag_barrier_label?: string;
    autocall_barrier_label?: string;
    capital_guaranteed?: boolean;
    category?: string;
    coupon_barrier_label?: string;
    coupon?: number;
    time_to_next_obs?: number;
    emetteur: string;
    distance?: number;
    due_date: string;
    end_date?: string;
    family?: string;
    guarantor?: string;
    has_fease?: boolean;
    has_marketing_doc?: boolean;
    has_term_sheet?: boolean;
    indexation_level?: string;
    best_seller?: boolean;
    is_eavest?: boolean;
    isin: string;
    label: string;
    launch_date: string;
    next_obs_date?: string;
    nominal?: number;
    observation_frequency?: string;
    path?: string;
    performance?: number;
    performance_year?: number;
    airbag_barrier?: number;
    coupon_barrier?: number;
    protection_barrier?: number;
    reimbursement_barrier?: number;
    protection_barrier_label?: string;
    start_price?: number;
    strike?: number;
    subscribe_end_date?: string;
    subscribe_start_date?: string;
    capital_protection: number;
    encrypted_id?: string;
    note_priips?: number;
    coupon_year: number;
    coupon_label?: string;
    remb_manual?: boolean;
    simplified?: boolean;
    // Foreign key fields
    currency?: {
        id: number;
        code?: string;
        label?: string;
    };
    sousjacent?: {
        id: number;
        label: string;
        type?: string;
    };
    status?: {
        id: number;
        code: string;
        description: string;
    };
    category_relation?: {
        id: number;
        // Add category fields as needed
    };
    deliver_relation?: {
        id: number;
        deliver?: string;
        groups?: string;
        nationality?: string;
    };
}

interface DjangoPrdCurrency {
    id: number;
    code?: string;
    label?: string;
}

// Map Django backend fields to frontend Product type with full details
function mapDjangoProductToFrontendDetailed(
    djangoProduct: DjangoPrdProduct
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

    const mappedFamily = familyMap[djangoProduct.family || ''] || 'undefined';
    const mappedStatus = djangoProduct.status ? (statusMap[djangoProduct.status.code] || 'Not started') : 'Not started';

    // Format launch date to match frontend format
    const launchDate = new Date(djangoProduct.launch_date);
    const monthNames = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai', 'Juin', 
                       'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
    const formattedDate = `${monthNames[launchDate.getMonth()]} ${launchDate.getFullYear()}`;

    // Build underlying string from sousjacent
    const underlyingString = djangoProduct.sousjacent?.label || djangoProduct.category || 'Unknown';

    const baseProduct = {
        name: djangoProduct.label,
        startDate: formattedDate,
        isin: djangoProduct.isin,
        issuer: djangoProduct.emetteur|| 'Unknown',
        underlying: underlyingString,
        status: mappedStatus as 'Not started' | 'Started' | 'Ended' | 'Reimbursed',
        family: mappedFamily as 'autocall' | 'cln' | 'participation' | 'phoenix' | 'protection' | 'reverse' | 'undefined',
        summary: `Produit structuré ${(djangoProduct.family || '').toLowerCase()} avec coupon de ${djangoProduct.coupon_year}% annuel.`
    };

    // Add detailed characteristics if available
    if (djangoProduct.coupon !== undefined) {
        return {
            ...baseProduct,
            characteristics: {
                emetteur: djangoProduct.emetteur || 'Unknown',
                devise: djangoProduct.currency?.code || djangoProduct.currency?.label || 'EUR',
                categorie: djangoProduct.family || djangoProduct.category || 'Unknown',
                sousJacents: underlyingString,
                barriereCoupon: djangoProduct.coupon_barrier ? `${Math.round(djangoProduct.coupon_barrier * 100)}%` : 
                               djangoProduct.coupon_barrier_label || 'N/A',
                observations: djangoProduct.capital_guaranteed ? 'Capital garanti' : 
                             djangoProduct.has_term_sheet ? 'Documentation disponible' : 
                             djangoProduct.simplified ? 'Version simplifiée' : 'Capital non garanti',
                coupon: djangoProduct.coupon_label || `${djangoProduct.coupon_year}%`,
                niveauInitial: djangoProduct.start_price ? `${Math.round(djangoProduct.start_price * 100)}%` : '100%',
                barriereRappel: djangoProduct.reimbursement_barrier ? `${Math.round(djangoProduct.reimbursement_barrier * 100)}%` : 
                               djangoProduct.autocall_barrier_label || 'N/A',
                barriereProtection: djangoProduct.protection_barrier ? `${Math.round(djangoProduct.protection_barrier * 100)}%` :
                                   djangoProduct.protection_barrier_label ||
                                   (djangoProduct.airbag_barrier ? `${Math.round(djangoProduct.airbag_barrier * 100)}%` : 'N/A')
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
    { params }: { params: Promise<{ isin: string }> }
) {
    const { isin } = await params;

    try {

        if (!isin) {
            return NextResponse.json(
                { error: 'ISIN parameter is required' },
                { status: 400 }
            );
        }

        // Construct API URL for Django backend
        const backendBaseUrl = process.env.DJANGO_BACKEND_URL || 'http://localhost:8000';
        const apiUrl = `${backendBaseUrl}/api/products/isin/${encodeURIComponent(isin)}/`;
        
        console.log('Calling Django backend URL:', apiUrl);

        // Build headers with authentication
        const headers: HeadersInit = {
            'Content-Type': 'application/json',
        };

        // Forward the user's JWT token from the browser to Django
        const authHeader = request.headers.get('authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            headers['Authorization'] = authHeader;
            console.log('Forwarding JWT token to Django:', authHeader.substring(0, 30) + '...');
        } else {
            console.log('No JWT token found in request headers');
            // Add authentication if configured via environment variables
            if (process.env.DJANGO_API_TOKEN) {
                headers['Authorization'] = `Bearer ${process.env.DJANGO_API_TOKEN}`;
                console.log('Using Django API token from environment');
            }

            // For session-based auth, you might need:
            if (process.env.DJANGO_SESSION_KEY) {
                headers['Cookie'] = `sessionid=${process.env.DJANGO_SESSION_KEY}`;
                console.log('Using Django session from environment');
            }

            // For basic auth:
            if (process.env.DJANGO_USERNAME && process.env.DJANGO_PASSWORD) {
                const credentials = Buffer.from(
                    `${process.env.DJANGO_USERNAME}:${process.env.DJANGO_PASSWORD}`
                ).toString('base64');
                headers['Authorization'] = `Basic ${credentials}`;
                console.log('Using Django basic auth from environment');
            }
        }

        // Fetch from Django backend
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers,
            cache: 'no-store' // Always fetch fresh data
        });

        if (!response.ok) {
            console.error(`Django API error: ${response.status} - ${response.statusText}`);
            if (response.status === 404) {
                return NextResponse.json(
                    { error: 'Product not found' },
                    { status: 404 }
                );
            }
            throw new Error(`Django API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Return both raw Django data and mapped product for compatibility
        const mappedProduct = mapDjangoProductToFrontendDetailed(data);

        return NextResponse.json({
            product: data, // Return raw Django data with relationships
            mappedProduct: mappedProduct, // Also include mapped version if needed
            success: true
        });

    } catch (error) {
        console.error(`Error fetching product ${isin} from Django backend:`, error);
        console.error('Full error details:', {
            name: error instanceof Error ? error.name : 'Unknown',
            message: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            isin: isin,
            backendUrl: process.env.DJANGO_BACKEND_URL || 'http://localhost:8000'
        });
        
        // Return error response
        return NextResponse.json(
            { 
                error: 'Failed to fetch product',
                message: error instanceof Error ? error.message : 'Unknown error',
                success: false,
                details: {
                    isin: isin,
                    timestamp: new Date().toISOString()
                }
            },
            { status: 500 }
        );
    }
}