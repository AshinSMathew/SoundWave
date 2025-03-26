import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cloudinary } from '@/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { getEmailFromAuthToken } from "@/lib/utils"

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadToCloudinary = async (file: File, resourceType: 'image' | 'video', folder: string): Promise<{
  url: string;
  publicId: string;
}> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `soundwave/${folder}`,
          resource_type: resourceType,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload result is undefined'));
          resolve(result);
        }
      ).end(buffer);
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('File upload to Cloudinary failed');
  }
};

export async function POST(request: NextRequest) {
  const email = getEmailFromAuthToken(request);
  if (!email) {
    return NextResponse.json(
        { message: 'Unauthorized. Email not found.' },
        { status: 401 }
    );
  }
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const genre = formData.get('genre') as string;
    const coverImage = formData.get('coverImage') as File;
    const audioFile = formData.get('audioFile') as File;

    if (!title || !genre) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!coverImage || !audioFile) {
      return NextResponse.json({ error: 'Missing cover image or audio file' }, { status: 400 });
    }

    // Upload files to Cloudinary
    const [coverImageUpload, audioFileUpload] = await Promise.all([
      uploadToCloudinary(coverImage, 'image', 'covers'),
      uploadToCloudinary(audioFile, 'video', 'tracks'),
    ]);

    const artistResult = await db
      `SELECT id FROM artists WHERE user_id=(SELECT id FROM users WHERE email= ${email})`;
    const artistId = artistResult[0].id;

    // Insert song into database
    const [newSong] = await db`
      INSERT INTO songs (
        title, 
        artist_id, 
        genre, 
        audio_url, 
        cover_image
      ) VALUES (
        ${title},
        ${artistId},
        ${genre},
        ${audioFileUpload.url},
        ${coverImageUpload.url}
      ) RETURNING id
    `;

    return NextResponse.json({ 
      message: 'Upload successful', 
      songId: newSong.id,
      audioUrl: audioFileUpload.url,
      coverImageUrl: coverImageUpload.url
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}