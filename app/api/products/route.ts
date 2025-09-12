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
    id_prd_status: number;
    capital_guaranteed: boolean;
    performance: number;
    // Add other fields as needed
}

interface DjangoPrdStatus {
    id: number;
    code: string;
    description: string;
}

// Map Django backend fields to frontend Product type
function mapDjangoProductToFrontend(djangoProduct: DjangoPrdProduct, status?: DjangoPrdStatus) {
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

    // Format launch date to match frontend format (e.g., "Fév. 2025")
    const launchDate = new Date(djangoProduct.launch_date);
    const monthNames = ['Jan.', 'Fév.', 'Mar.', 'Avr.', 'Mai', 'Juin', 
                       'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'];
    const formattedDate = `${monthNames[launchDate.getMonth()]} ${launchDate.getFullYear()}`;

    return {
        name: djangoProduct.label,
        startDate: formattedDate,
        isin: djangoProduct.isin,
        issuer: djangoProduct.deliver || 'Unknown',
        underlying: djangoProduct.category || 'Unknown',
        status: mappedStatus as 'Not started' | 'Started' | 'Ended' | 'Reimbursed',
        family: mappedFamily as 'autocall' | 'cln' | 'participation' | 'phoenix' | 'protection' | 'reverse' | 'undefined'
    };
}

export async function GET(request: NextRequest) {
    try {
        // Get search params
        const searchParams = request.nextUrl.searchParams;
        const limit = searchParams.get('limit') || '50';
        const isin = searchParams.get('isin');

        // Construct API URL for Django backend
        const backendBaseUrl = process.env.DJANGO_BACKEND_URL || 'http://localhost:8000';
        
        let apiUrl = `${backendBaseUrl}/api/products/`;
        const params = new URLSearchParams();
        
        if (isin) {
            params.append('isin', isin);
        }
        params.append('limit', limit);
        
        if (params.toString()) {
            apiUrl += `?${params.toString()}`;
        }

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
            throw new Error(`Django API returned ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Map Django products to frontend format
        const mappedProducts = data.results?.map((product: DjangoPrdProduct) => 
            mapDjangoProductToFrontend(product)
        ) || [];

        return NextResponse.json({
            products: mappedProducts,
            count: data.count || mappedProducts.length,
            next: data.next,
            previous: data.previous
        });

    } catch (error) {
        console.error('Error fetching products from Django backend:', error);
        
        // Return error response
        return NextResponse.json(
            { 
                error: 'Failed to fetch products',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}