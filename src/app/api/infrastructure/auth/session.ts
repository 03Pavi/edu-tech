import { SessionOptions } from "iron-session";
import { UserRole } from "@prisma/client";

export interface User {
  id: number;
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: UserRole;
}

export const defaultSession: User = {
  id: 0,
  isLoggedIn: false,
  name: "",
  email: "",
  role: UserRole.STUDENT,
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "edu_quest_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
