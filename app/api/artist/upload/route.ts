import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cloudinary } from '@/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { getEmailFromAuthToken } from "@/lib/utils";

// Configuration
export const config = {
  api: {
    bodyParser: false, // Required for file uploads
  },
};

// Constants
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_AUDIO_SIZE = 20 * 1024 * 1024; // 20MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/x-m4a'];

/**
 * Uploads a file to Cloudinary
 */
const uploadToCloudinary = async (file: File, resourceType: 'image' | 'auto', folder: string): Promise<{
  url: string;
  publicId: string;
}> => {
  try {
    if (!file || !file.size) {
      throw new Error('Invalid file provided');
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(arrayBuffer));

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
    console.error(`Cloudinary ${folder} upload error:`, error);
    throw new Error(`Failed to upload ${folder === 'covers' ? 'image' : 'audio'}`);
  }
};

/**
 * Validates file type and size
 */
const validateFile = (file: File, allowedTypes: string[], maxSize: number, fileType: string) => {
  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid ${fileType} type. Allowed types: ${allowedTypes.join(', ')}`);
  }
  if (file.size > maxSize) {
    throw new Error(`${fileType} must be less than ${maxSize / (1024 * 1024)}MB`);
  }
};

export async function POST(request: NextRequest) {
  // Authentication
  const email = getEmailFromAuthToken(request);
  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Email not found.' },
      { status: 401 }
    );
  }

  try {
    const formData = await request.formData();

    // Validate form fields
    const title = formData.get('title')?.toString()?.trim();
    const genre = formData.get('genre')?.toString()?.trim();
    const coverImage = formData.get('coverImage') as File | null;
    const audioFile = formData.get('audioFile') as File | null;

    if (!title || !genre) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!coverImage || !audioFile) {
      return NextResponse.json(
        { success: false, error: 'Missing cover image or audio file' },
        { status: 400 }
      );
    }

    // File validations
    try {
      validateFile(coverImage, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE, 'Cover image');
      validateFile(audioFile, ALLOWED_AUDIO_TYPES, MAX_AUDIO_SIZE, 'Audio file');
    } catch (validationError) {
      return NextResponse.json(
        { success: false, error: validationError instanceof Error ? validationError.message : 'Invalid file' },
        { status: 400 }
      );
    }

    // Upload files in parallel
    const [coverImageUpload, audioFileUpload] = await Promise.all([
      uploadToCloudinary(coverImage, 'image', 'covers'),
      uploadToCloudinary(audioFile, 'auto', 'tracks'),
    ]);

    // Get artist ID
    const [artist] = await db`
      SELECT id FROM artists 
      WHERE user_id = (SELECT id FROM users WHERE email = ${email})
    `;

    if (!artist?.id) {
      return NextResponse.json(
        { success: false, error: 'Artist profile not found' },
        { status: 404 }
      );
    }

    // Insert song into database
    const [newSong] = await db`
      INSERT INTO songs (
        title, 
        artist_id, 
        genre, 
        audio_url, 
        cover_image,
        created_at
      ) VALUES (
        ${title},
        ${artist.id},
        ${genre},
        ${audioFileUpload.url},
        ${coverImageUpload.url},
        NOW()
      ) RETURNING id, title
    `;

    return NextResponse.json({
      success: true,
      message: 'Upload successful',
      data: {
        songId: newSong.id,
        title: newSong.title,
        audioUrl: audioFileUpload.url,
        coverImageUrl: coverImageUpload.url,
        publicId: audioFileUpload.publicId,
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}