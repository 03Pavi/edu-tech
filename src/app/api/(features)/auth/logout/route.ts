import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { getIronSession } from "iron-session";
import { sessionOptions, defaultSession, User as SessionUser } from "../../../infrastructure/auth/session";
import { cookies } from "next/headers";

export async function POST() {
  const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
  session.destroy();
  return NextResponse.json({ isLoggedIn: false, message: "Logged out successfully" });
}
