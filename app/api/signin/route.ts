import { NextResponse } from "next/server";
import { fakeDB } from "@/lib/fakeDb";

export async function POST(req: any) {
  try {
    const body = await req.json();

    const { email, password } = body;

    // 1. Email validation
    if (!email || email.trim() === "") {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    // 2. Password validation
    if (!password || password.length < 6) {
      return NextResponse.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    // 3. get users from fake DB
    const users = fakeDB.getAllUsers();

    // 4. find user
    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 5. password check
    if (user.password !== password) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // 6. Success response
    return NextResponse.json(
      { message: "User logged in successfully", user: user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json("Server error occurred", { status: 500 });
  }
}
