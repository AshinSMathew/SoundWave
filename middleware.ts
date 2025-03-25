import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from 'jose';

// Use the same secret key as in your login route
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

// Define paths for different access levels
const PUBLIC_PATHS = ['/login', '/signup'];
const LISTENER_PATHS = ['/dashboard', '/music'];
const ARTIST_PATHS = ['/artist/upload', '/artist/profile'];
const ALL_PROTECTED_PATHS = [...LISTENER_PATHS, ...ARTIST_PATHS];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get the token if it exists
  const token = request.cookies.get("authToken")?.value;
  
  // Determine path categories
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const isListenerPath = LISTENER_PATHS.includes(pathname);
  const isArtistPath = ARTIST_PATHS.includes(pathname);
  const isProtectedPath = ALL_PROTECTED_PATHS.includes(pathname);
  
  // STEP 1: Handle public paths (login, signup)
  if (isPublicPath) {
    // If no token on public path, just allow access
    if (!token) {
      return NextResponse.next();
    }
    
    // If token exists on public path, verify and redirect if valid
    try {
      const secretKey = new TextEncoder().encode(SECRET_KEY);
      const { payload } = await jose.jwtVerify(token, secretKey);
      
      // Determine redirect based on user role
      const redirectUrl = payload.role === 'artist' 
        ? new URL("/artist/upload", request.url)
        : new URL("/dashboard", request.url);
      
      return NextResponse.redirect(redirectUrl);
    } catch (error) {
      // Invalid token on public path, clear it and allow access
      const response = NextResponse.next();
      response.cookies.delete("authToken");
      return response;
    }
  }
  
  // STEP 2: Handle protected paths
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
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }
      
      if (isListenerPath && payload.role !== 'listener') {
        // Non-listener trying to access listener path
        return NextResponse.redirect(new URL("/artist/upload", request.url));
      }
      
      // Valid token and correct role, allow access
      const response = NextResponse.next();
      response.headers.set('x-user-id', payload.sub as string);
      response.headers.set('x-user-role', payload.role as string);
      return response;
    } catch (error) {
      // Invalid token on protected path, redirect to login
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.delete("authToken");
      return response;
    }
  }
  
  // STEP 3: Default case - allow access to other paths
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/login',
    '/signup',
    '/dashboard',
    '/music',
    '/artist/upload',
    '/artist/profile'
  ],
};