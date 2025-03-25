import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUsers = await db`
      SELECT * FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Determine user role based on email domain
    const role = email.endsWith('@artist.com') ? 'artist' : 'listener';

    // Insert new user
    const newUsers = await db`
      INSERT INTO users (name, email, password, role) 
      VALUES (${name}, ${email}, ${passwordHash}, ${role}) 
      RETURNING id, name, email, role, created_at
    `

    const newUser = newUsers[0]

    // If the user is an artist, also insert into artists table
    if (role === 'artist') {
      await db`
        INSERT INTO artists (user_id) 
        VALUES (${newUser.id})
      `
    }

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          createdAt: newUser.created_at,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}