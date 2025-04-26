import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cloudinary } from '@/cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { getEmailFromAuthToken } from "@/lib/utils";

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
  // Log the incoming request for debugging
  console.log("Upload API called:", request.url);
  
  // Add CORS headers for cross-origin requests
  const headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { status: 204, headers });
  }

  // Authentication
  const email = getEmailFromAuthToken(request);
  console.log("Auth check, email:", email ? "found" : "not found");
  
  if (!email) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Email not found.' },
      { status: 401, headers }
    );
  }

  try {
    const formData = await request.formData();
    console.log("FormData received");

    // Validate form fields
    const title = formData.get('title')?.toString()?.trim();
    const genre = formData.get('genre')?.toString()?.trim();
    const coverImage = formData.get('coverImage') as File | null;
    const audioFile = formData.get('audioFile') as File | null;

    console.log("Form fields:", { 
      title: title ? "✓" : "✗", 
      genre: genre ? "✓" : "✗", 
      coverImage: coverImage ? "✓" : "✗", 
      audioFile: audioFile ? "✓" : "✗" 
    });

    if (!title || !genre) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400, headers }
      );
    }

    if (!coverImage || !audioFile) {
      return NextResponse.json(
        { success: false, error: 'Missing cover image or audio file' },
        { status: 400, headers }
      );
    }

    // File validations
    try {
      validateFile(coverImage, ALLOWED_IMAGE_TYPES, MAX_IMAGE_SIZE, 'Cover image');
      validateFile(audioFile, ALLOWED_AUDIO_TYPES, MAX_AUDIO_SIZE, 'Audio file');
      console.log("File validation passed");
    } catch (validationError) {
      console.error("File validation error:", validationError);
      return NextResponse.json(
        { success: false, error: validationError instanceof Error ? validationError.message : 'Invalid file' },
        { status: 400, headers }
      );
    }

    console.log("Starting Cloudinary uploads");
    // Upload files in parallel
    const [coverImageUpload, audioFileUpload] = await Promise.all([
      uploadToCloudinary(coverImage, 'image', 'covers'),
      uploadToCloudinary(audioFile, 'auto', 'tracks'),
    ]);
    console.log("Cloudinary uploads complete");

    // Get artist ID
    console.log("Querying artist ID for email:", email);
    const [artist] = await db`
      SELECT id FROM artists 
      WHERE user_id = (SELECT id FROM users WHERE email = ${email})
    `;

    if (!artist?.id) {
      console.error("Artist not found for email:", email);
      return NextResponse.json(
        { success: false, error: 'Artist profile not found' },
        { status: 404, headers }
      );
    }
    console.log("Artist found, ID:", artist.id);

    // Insert song into database
    console.log("Inserting song into database");
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
    console.log("Song inserted, ID:", newSong.id);

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
    }, { status: 200, headers });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Upload failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers }
    );
  }
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}