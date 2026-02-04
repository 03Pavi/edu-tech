'use server';

import { getSession } from "@/app/actions";
import { redirect } from "next/navigation";
import { UserRole } from "@/app/api/domain/auth/user-role.enum";

export async function login(formData: FormData) {
  const session = await getSession();
  const email = formData.get("email") as string;
  const name = formData.get("name") as string || "User";

  let role: UserRole = UserRole.STUDENT;
  if (email.includes('admin')) {
    role = UserRole.ADMIN;
  } else if (email.includes('teacher')) {
    role = UserRole.TEACHER;
  }

  session.isLoggedIn = true;
  session.email = email;
  session.name = name;
  session.role = role;

  await session.save();
  redirect("/dashboard");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/auth/login");
}
