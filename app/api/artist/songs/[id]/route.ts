import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getEmailFromAuthToken } from "@/lib/utils"
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with error handling
if (process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
} else {
  console.warn('Cloudinary configuration incomplete - image uploads disabled');
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const songId = parseInt(params.id);
    
    if (isNaN(songId)) {
      return NextResponse.json(
        { message: 'Invalid song ID' },
        { status: 400 }
      );
    }

    const email = getEmailFromAuthToken(req);
    if (!email) {
      return NextResponse.json(
        { message: 'Unauthorized. Email not found.' },
        { status: 401 }
      );
    }

    const artistResult = await db`
      SELECT a.id 
      FROM artists a
      JOIN users u ON a.user_id = u.id
      WHERE u.email = ${email}
    `;
    
    if (!artistResult || artistResult.length === 0) {
      return NextResponse.json(
        { message: 'Artist not found' },
        { status: 404 }
      );
    }

    const artistId = artistResult[0].id;

    const songResult = await db`
      SELECT id, cover_image 
      FROM songs 
      WHERE id = ${songId} AND artist_id = ${artistId}
    `;

    if (songResult.length === 0) {
      return NextResponse.json(
        { message: 'Song not found or not owned by artist' },
        { status: 404 }
      );
    }

    // Delete from database
    await db`DELETE FROM songs WHERE id = ${songId}`;

    return NextResponse.json(
      { message: 'Song deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting song:', error);
    return NextResponse.json(
      { 
        error: 'Unable to delete song', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const songId = parseInt(id);
  
  if (isNaN(songId)) {
    return NextResponse.json(
      { message: 'Invalid song ID' },
      { status: 400 }
    );
  }

  const email = getEmailFromAuthToken(req);
  if (!email) {
    return NextResponse.json(
      { message: 'Unauthorized. Email not found.' },
      { status: 401 }
    );
  }

  const formData = await req.formData();

  try {
    // Verify the song belongs to the artist
    const artistResult = await db`
      SELECT a.id 
      FROM artists a
      JOIN users u ON a.user_id = u.id
      WHERE u.email = ${email}
    `;
    
    if (!artistResult || artistResult.length === 0) {
      return NextResponse.json(
        { message: 'Artist not found' },
        { status: 404 }
      );
    }

    const artistId = artistResult[0].id;

    const songResult = await db`
      SELECT id, cover_image 
      FROM songs 
      WHERE id = ${songId} AND artist_id = ${artistId}
    `;

    if (songResult.length === 0) {
      return NextResponse.json(
        { message: 'Song not found or not owned by artist' },
        { status: 404 }
      );
    }

    const title = formData.get('title') as string;
    const genre = formData.get('genre') as string;
    const coverImageFile = formData.get('cover_image') as File | null;

    if (!title || !genre) {
      return NextResponse.json(
        { message: 'Title and genre are required' },
        { status: 400 }
      );
    }

    let coverImageUrl = songResult[0].cover_image;

    // Update song in database
    const updatedSong = await db`
      UPDATE songs
      SET 
        title = ${title},
        genre = ${genre},
        cover_image = ${coverImageUrl},
        created_at = NOW()
      WHERE id = ${songId}
      RETURNING 
        id, 
        title, 
        genre, 
        cover_image,
        audio_url,
        created_at
    `;

    // Get artist name for response
    const artistNameResult = await db`
      SELECT name FROM users WHERE id = (SELECT user_id FROM artists WHERE id = ${artistId})
    `;

    return NextResponse.json({
      ...updatedSong[0],
      artist_name: artistNameResult[0].name
    });
  } catch (error) {
    console.error('Error updating song:', error);
    return NextResponse.json(
      { 
        error: 'Unable to update song', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}