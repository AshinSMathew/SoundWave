import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from 'jose';

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

const PUBLIC_PATHS = ['/login', '/signup'];
const LISTENER_PATHS = ['/dashboard'];
const ARTIST_PATHS = ['/artist/upload', '/artist/dashboard', '/artist/profile'];
const API_PATHS = ['/api/artist/upload'];
const ALL_PROTECTED_PATHS = [...LISTENER_PATHS, ...ARTIST_PATHS];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("authToken")?.value;

  // Special handling for API routes
  if (pathname.startsWith('/api/')) {
    // For API routes, simply forward the auth token in headers for the API to validate
    if (token) {
      try {
        const secretKey = new TextEncoder().encode(SECRET_KEY);
        const { payload } = await jose.jwtVerify(token, secretKey);

        const response = NextResponse.next();
        // Add user info to request headers for API routes to access
        response.headers.set('x-user-id', payload.sub as string);
        response.headers.set('x-user-role', payload.role as string);
        response.headers.set('x-user-email', payload.email as string);
        
        console.log("API request authorized, added user headers");
        return response;
      } catch (error) {
        console.error("API token validation error:", error);
        // For APIs, return 401 instead of redirecting if token is invalid
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    } else if (API_PATHS.some(path => pathname.startsWith(path))) {
      console.error("API request unauthorized, no token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } else {
      // Allow non-protected API paths without token
      return NextResponse.next();
    }
  }

  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isListenerPath = LISTENER_PATHS.includes(pathname);
  const isArtistPath = ARTIST_PATHS.includes(pathname);
  const isProtectedPath = ALL_PROTECTED_PATHS.includes(pathname);

  // Check for CORS preflight OPTIONS requests and handle them
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  if (isPublicPath) {
    if (!token) {
      console.log("Public path, no token - allowing access");
      return NextResponse.next();
    }
    
    // If token exists on public path, verify and redirect if valid
    try {
      const secretKey = new TextEncoder().encode(SECRET_KEY);
      const { payload } = await jose.jwtVerify(token, secretKey);
      
      // Determine redirect based on user role
      const redirectUrl = payload.role === 'artist' 
        ? new URL("/artist/profile", request.url)
        : new URL("/dashboard", request.url);
      
      console.log(`Public path with valid token - redirecting to ${redirectUrl}`);
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      console.error("Token validation error on public path:", error);
      // Invalid token on public path, clear it and allow access
      const response = NextResponse.next();
      response.cookies.delete("authToken");
      return response;
    }
  }
  
  // Handle protected paths
  if (isProtectedPath) {
    // No token on protected path, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    
    // Token exists, verify it
    try {
      const secretKey = new TextEncoder().encode(SECRET_KEY);
      const { payload } = await jose.jwtVerify(token, secretKey);
      
      // Check role-based access
      if (isArtistPath && payload.role !== 'artist') {
        // Non-artist trying to access artist path
        console.log("Role mismatch: non-artist attempting to access artist path");
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      if (isListenerPath && payload.role !== 'listener') {
        // Non-listener trying to access listener path
        console.log("Role mismatch: non-listener attempting to access listener path");
        return NextResponse.redirect(new URL("/artist/profile", request.url));
      }
      
      // Valid token and correct role, allow access
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.sub as string);
      response.headers.set('x-user-role', payload.role as string);
      response.headers.set('x-user-email', payload.email as string);
      return response;
    } catch (error) {
      console.error("Token validation error on protected path:", error);
      // Invalid token on protected path, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }
  
  // Default case - allow access to other paths
  console.log("Non-managed path - allowing access");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard',
    '/artist/upload',
    '/artist/dashboard',
    '/artist/profile',
    '/api/artist/upload',
  ],
};