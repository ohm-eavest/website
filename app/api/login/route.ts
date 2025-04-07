// app/api/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { email, password } = await request.json();

    // Replace this with your actual authentication logic
    const validEmail = 'user@example.com';
    const validPassword = 'password';

    if (email === validEmail && password === validPassword) {
        // Set a cookie to indicate the user is authenticated
        const response = NextResponse.json({ success: true });
        response.cookies.set('isAuthenticated', 'true');
        return response;
    } else {
        // Return an error for invalid credentials
        return NextResponse.json({ success: false }, { status: 401 });
    }
}