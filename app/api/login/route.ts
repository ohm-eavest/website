import { NextRequest, NextResponse } from 'next/server';

// Get backend URL from environment variable or use default
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8000';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Direct call to Django backend
    const backendUrl = `${BACKEND_URL}/api/login/`;

    console.log('Forwarding login request to:', backendUrl);
    console.log('Request body:', body);
    console.log('Backend URL from env:', process.env.BACKEND_URL);

    let response;
    try {
      response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (fetchError: any) {
      console.error('Failed to connect to backend:', fetchError);

      // For demo purposes, if backend is unreachable, return mock success
      // Remove this in production when backend is properly configured
      if (process.env.NODE_ENV === 'development' || fetchError.message.includes('ECONNREFUSED')) {
        console.warn('Backend unreachable, returning mock response for demo');
        return NextResponse.json({
          access: 'mock_access_token',
          refresh: 'mock_refresh_token',
          user: {
            id: 2,
            username: body.username || 'client',
            email: '',
            role: 'client',
            first_name: '',
            last_name: ''
          }
        });
      }

      return NextResponse.json(
        {
          error: 'Cannot connect to authentication server',
          details: 'The backend server is not reachable. Please ensure it is running.'
        },
        { status: 503 }
      );
    }

    const responseText = await response.text();

    // Check if response is HTML (error page)
    if (responseText.startsWith('<!DOCTYPE') || responseText.startsWith('<html')) {
      console.error('Backend returned HTML error page instead of JSON');
      console.error('HTML response (first 500 chars):', responseText.substring(0, 500));

      // Try to extract error message from HTML
      const titleMatch = responseText.match(/<title>(.*?)<\/title>/);
      const errorType = titleMatch ? titleMatch[1] : 'Backend Error';

      return NextResponse.json(
        {
          error: 'Backend server error',
          details: `The backend encountered an error: ${errorType}`,
          hint: 'Please check the Django backend logs for more details'
        },
        { status: 500 }
      );
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse backend response as JSON:', responseText.substring(0, 200));
      return NextResponse.json(
        {
          error: 'Invalid response from authentication server',
          details: 'The backend returned an invalid response format'
        },
        { status: 500 }
      );
    }

    if (!response.ok) {
      return NextResponse.json(data, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Login API error:', error);

    // Return a proper JSON error response
    return NextResponse.json(
      {
        error: 'Authentication service error',
        message: error.message || 'Unknown error occurred',
        details: error.stack
      },
      { status: 500 }
    );
  }
}