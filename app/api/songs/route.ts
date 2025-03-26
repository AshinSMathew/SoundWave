// app/api/songs/route.ts
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    console.log('Attempting to fetch songs...') // Debug log
    
    const songs = await db`
      SELECT 
        s.id,
        s.title,
        s.genre,
        s.audio_url,
        s.cover_image,
        u.name as artist_name
      FROM songs s
      JOIN artists a ON s.artist_id = a.id
      JOIN users u ON a.user_id = u.id
      ORDER BY s.created_at DESC
    `
    
    console.log('Successfully fetched songs:', songs.length) // Debug log
    
    if (!songs || songs.length === 0) {
      return NextResponse.json([], { status: 200 }) // Return empty array if no songs
    }
    
    return NextResponse.json(songs)
    
  } catch (error) {
    console.error('Database error:', error) // Detailed error logging
    
    return NextResponse.json(
      { 
        error: 'Failed to fetch songs',
        details: error instanceof Error ? error.message : 'Unknown database error'
      },
      { status: 500 }
    )
  }
}