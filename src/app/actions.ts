
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { defaultSession, sessionOptions, User } from "@/lib/session";

export async function getSession() {
  const session = await getIronSession<User>(await cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.name = defaultSession.name;
    session.email = defaultSession.email;
    session.role = defaultSession.role;
  }

  return session;
}
