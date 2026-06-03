import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_key_change_in_production'
);

export async function middleware(request: NextRequest) {
  // Only apply to /hq-secure-88 routes
  if (request.nextUrl.pathname.startsWith('/hq-secure-88')) {
    // Allow access to the login page itself
    if (request.nextUrl.pathname === '/hq-secure-88/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/hq-secure-88/login', request.url));
    }

    try {
      // Verify the token
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Invalid token (expired, malformed, etc.)
      console.error('Invalid JWT in middleware', error);
      const response = NextResponse.redirect(new URL('/hq-secure-88/login', request.url));
      response.cookies.delete('admin_token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/hq-secure-88/:path*',
};
