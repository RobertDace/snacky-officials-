import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, email, password, avatarUrl } = body;

    if (!username || !email || !password) {
      return NextResponse.json({ error: "Username, email, and password are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters long." }, { status: 400 });
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email.toLowerCase().trim() },
          { username: username.trim() }
        ]
      }
    });

    if (existing) {
      if (existing.email === email.toLowerCase().trim()) {
        return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
      }
      return NextResponse.json({ error: "This username is already taken. Please pick another cute one!" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role: "FAN",
        avatarUrl: avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(username)}&backgroundColor=ffd5dc`,
      },
    });

    const token = await signToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: "FAN",
    });

    await setAuthCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
