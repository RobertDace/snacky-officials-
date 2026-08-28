import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken, setAuthCookie } from "@/lib/auth";
import { UserRole } from "@/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, password } = body; // identifier can be email or username

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/Username and password are required." }, { status: 400 });
    }

    const cleanIdentifier = identifier.trim();
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: cleanIdentifier.toLowerCase() },
          { username: cleanIdentifier }
        ]
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials. Account not found." }, { status: 401 });
    }

    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid credentials. Password does not match." }, { status: 401 });
    }

    const token = await signToken({
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role as UserRole,
    });

    await setAuthCookie(token);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role as UserRole,
        avatarUrl: user.avatarUrl,
        createdAt: user.createdAt.toISOString(),
      },
    });
  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}