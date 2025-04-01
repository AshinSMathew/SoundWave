# SoundWave - Music Player Website

SoundWave is a web-based music player that allows users to upload, store, and stream MP3 files. It leverages Cloudinary for media storage and NeonDB for database management, ensuring a seamless and efficient user experience.

## Features

- **User Authentication**: Secure login and registration.
- **User & Artist Roles**:
  - Users can sign up with any email (e.g., `user@gmail.com`).
  - To register as an artist, an email with `@artist.com` is required.
- **MP3 Upload & Storage**: Upload MP3 files to Cloudinary.
- **Image Storage**: Store album covers and thumbnails on Cloudinary.
- **Database Management**: Store MP3 file metadata (URLs, titles, artists, etc.) in NeonDB.
- **Music Playback**: Play songs directly from the website.
- **Responsive Design**: Works on desktops, tablets, and mobile devices.

## Tech Stack

- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Cloudinary, NeonDB
- **Storage**: Cloudinary (MP3 & images)

## Installation & Setup

### Prerequisites
- Node.js (>=16)
- Cloudinary account
- NeonDB account

### Steps

1. **Clone the Repository**
   ```sh
   git clone https://github.com/AshinSMathew/SoundWave.git
   cd SoundWave
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

## Step 1: Setting Up Cloudinary
1. Visit [Cloudinary Console](https://cloudinary.com/) and log in.
2. Navigate to the **Dashboard**.
3. Copy the following credentials from the **API Environment Variables**:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
4. Add these details to your `.env.local` file:
   ```env
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

## Step 2: Creating a NeonDB Database
1. Visit [NeonDB Console](https://console.neon.tech/app/welcome) and log in.
2. Click **Create a Database** and provide the following details:
   - **Name:** (Choose any suitable name)
   - **PostgreSQL Version:** `17`
   - **Region:** `AWS Singapore`
3. Click **Create** to initialize your database.

## Step 3: Obtaining Connection String
1. After creating the database, click the **Connect** button.
2. Select **Connection String** and choose **Next.js** as the platform.
3. Copy the generated `.env` snippet.

## Step 4: Configuring the Project
1. Navigate to your project root directory.
2. Create a new **.env.local** file.
3. Open `.env.local` and paste the copied connection string.
4. Save the file.

## Step 5: Running the Project
```sh
npm run dev
```

6. **Open in Browser**
   Navigate to `http://localhost:3000` to view the application.

## Hosted Link

The project is live at: [SoundWave](https://sound-wave-lovat.vercel.app)
