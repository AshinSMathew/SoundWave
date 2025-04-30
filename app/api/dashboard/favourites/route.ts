import { NextResponse, NextRequest } from 'next/server'
import { db } from '@/lib/db'
import { getEmailFromAuthToken } from "@/lib/utils"

export async function POST(req: NextRequest) {
    const email = getEmailFromAuthToken(req);
    if (!email) {
        return NextResponse.json(
        { message: 'Unauthorized. Email not found.' },
        { status: 401 }
        );
    }

  try{
    const artistResult = await db
      `SELECT id FROM artists WHERE user_id=(SELECT id FROM users WHERE email= ${email})`;
    const artistId = artistResult[0].id;

    const { songId } = await req.json();
    const current = await db`
      SELECT song_ids FROM user_favorites 
      WHERE user_id = ${artistId}
    `

    let updatedSongIds: number[]
    let action: string

    if (current.length === 0) {
      updatedSongIds = [songId]
      action = "added"
      await db`
        INSERT INTO user_favorites (user_id, song_ids)
        VALUES (${artistId}, ${updatedSongIds})
      `
    } else {
      const currentSongIds = current[0].song_ids || []
      
      if (currentSongIds.includes(songId)) {
        updatedSongIds = currentSongIds.filter((id: any) => id !== songId)
        action = "removed"
      } else {
        updatedSongIds = [...currentSongIds, songId]
        action = "added"
      }

      await db`
        UPDATE user_favorites 
        SET song_ids = ${updatedSongIds}, updated_at = NOW()
        WHERE user_id = ${artistId}
      `
    }

    return NextResponse.json({ action, songIds: updatedSongIds })
  } catch (error) {
    console.error("Favorites error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
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
        const result = await db`
        SELECT song_ids FROM user_favorites 
        WHERE user_id = ${artistId}
        `

    const songIds = result.length > 0 ? result[0].song_ids : []
    
    // If you need full song details, you can join with songs table
    const songs = songIds.length > 0 
      ? await db`SELECT * FROM songs WHERE id = ANY(${songIds})`
      : []

    return NextResponse.json(songs)
  } catch (error) {
    console.error("Get favorites error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}