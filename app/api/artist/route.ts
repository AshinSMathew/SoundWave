import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db'
import { getEmailFromAuthToken } from "@/lib/utils"

export interface SongData {
  id: number
  title: string
  genre: string
  cover_image: string
  audio_url: string
  created_at: string
}

export async function GET(req: NextRequest) {
  const email = getEmailFromAuthToken(req);
  if (!email) {
    return NextResponse.json(
      { message: 'Unauthorized. Email not found.' },
      { status: 401 }
    );
  }

  try {
    const artistResult = await db
      `SELECT id FROM artists WHERE user_id=(SELECT id FROM users WHERE email= ${email})`;
    const artistId = artistResult[0].id;

    const songs = await db`
    SELECT 
        s.id, 
        s.title, 
        s.genre, 
        s.cover_image,
        s.audio_url,
        s.created_at,
        u.name as artist_name
        FROM 
            songs s
        JOIN 
            artists a ON s.artist_id = a.id
        JOIN 
            users u ON a.user_id = u.id
        WHERE 
            s.artist_id = ${artistId}
        ORDER BY 
            s.created_at DESC
    `;
    console.log(songs)
    return NextResponse.json(songs);
  } catch (error) {
    console.error('Error fetching artist tracks:', error);
    return NextResponse.json(
      { 
        error: 'Unable to fetch tracks', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}