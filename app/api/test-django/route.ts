import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const backendBaseUrl = process.env.DJANGO_BACKEND_URL || 'http://localhost:8000';
        console.log('Testing Django backend connection to:', backendBaseUrl);

        // Test basic connection to Django backend
        const response = await fetch(backendBaseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        console.log('Django backend response status:', response.status);

        return NextResponse.json({
            success: true,
            backendUrl: backendBaseUrl,
            status: response.status,
            statusText: response.statusText,
            message: 'Django backend connection test completed'
        });

    } catch (error) {
        console.error('Django backend connection test failed:', error);
        
        return NextResponse.json({
            success: false,
            backendUrl: process.env.DJANGO_BACKEND_URL || 'http://localhost:8000',
            error: error instanceof Error ? error.message : 'Unknown error',
            message: 'Django backend connection failed'
        }, { status: 500 });
    }
}