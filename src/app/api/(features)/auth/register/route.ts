export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { AuthService } from "../../../services/auth.service";

export async function POST(req: Request) {
  const authService = new AuthService();
  try {
    const body = await req.json();
    const user = await authService.register(body);

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: error.message || "Registration failed" },
      { status: 400 }
    );
  }
}
