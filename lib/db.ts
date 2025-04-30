import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL in environment variables.");
}
export const db = neon(process.env.DATABASE_URL);

const schema = async () => {
  try {
    await db`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) CHECK (role IN ('listener', 'artist')) DEFAULT 'listener',
        created_at TIMESTAMP DEFAULT NOW())
    `;

    await db`
        CREATE TABLE IF NOT EXISTS artists(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW())
    `;

    await db`
        CREATE TABLE IF NOT EXISTS songs(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        artist_id INTEGER REFERENCES artists(id) ON DELETE SET NULL,
        genre VARCHAR(100),
        audio_url TEXT NOT NULL,
        cover_image TEXT,
        created_at TIMESTAMP DEFAULT NOW())
    `;

    await db`
    CREATE TABLE IF NOT EXISTS user_favorites (
      user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
      song_ids INTEGER[] DEFAULT '{}'::INTEGER[],
      updated_at TIMESTAMP DEFAULT NOW())
    `;

    console.log("Database initialized successfully")
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

schema();