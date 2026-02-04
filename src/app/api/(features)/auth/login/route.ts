export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { AuthService } from "../../../services/auth.service";
import { sessionOptions, User as SessionUser } from "../../../infrastructure/auth/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const authService = new AuthService();
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await authService.login(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Set up session
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    session.isLoggedIn = true;
    session.id = user.id;
    session.name = user.name || "";
    session.email = user.email;
    session.role = user.role;
    await session.save();

    return NextResponse.json({
      message: "Login successful",
      user: user // Service guarantees no password here
    });

  } catch (error: any) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: error.message || "Login failed" },
      { status: 500 }
    );
  }
}
