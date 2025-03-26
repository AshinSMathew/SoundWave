import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEmailFromAuthToken(request: NextRequest): string | null {
    try {
        // Get the authToken cookie from the request
        const authToken = request.cookies.get('authToken')?.value;
        if (!authToken) {
            console.log('authToken cookie not found.');
            return null;
        }

        // Decode the JWT using your secret key
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET as string) as { userEmail?: string };
        console.log(decoded)
        // Extract and return the email from the token payload
        if (decoded && decoded.userEmail) {
            console.log('Email extracted from authToken:', decoded.userEmail);
            return decoded.userEmail;
        } else {
            console.log('Email not found in authToken payload.');
            return null;
        }
    } catch (error) {
        console.error('Error decoding authToken:', error);
        return null;
    }
}
