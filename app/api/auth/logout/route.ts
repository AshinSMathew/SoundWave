import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    // Get the cookie store and delete the token
    const cookieStore = cookies();
    (await cookieStore).delete('authToken');
    
    // Return success response
    return NextResponse.json(
      { success: true, message: 'Logged out successfully' },
      { 
        status: 200,
        headers: {
          // Clear the cookie on the client side as well
          'Set-Cookie': `authToken=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`
        }
      }
    );
  } catch (error) {
    // Handle any potential errors during logout
    console.error('Logout error:', error);
    
    return NextResponse.json(
      { success: false, message: 'Logout failed' },
      { status: 500 }
    );
  }
}