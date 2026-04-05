import { fakeDB } from "@/lib/fakeDb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { fullName, email, password, confirmPassword } = body;

    // basic validation
    if (!fullName || !email || !password) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    if (password !== confirmPassword) {
      return Response.json({ message: "Passwords do not match" }, { status: 400 });
    }

    // check duplicate
    const existing = fakeDB.findUserByEmail(email);
    if (existing) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // create user
    const newUser = fakeDB.createUser({
      id: Date.now(),
      fullName,
      email,
      password,
    });

    console.log("ALL USERS:", fakeDB.getAllUsers());

    return Response.json({
      message: "User created successfully (FAKE DB)",
      user: newUser,
    });

  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}