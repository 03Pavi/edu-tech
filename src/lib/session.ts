import { SessionOptions } from "iron-session";

export interface User {
  isLoggedIn: boolean;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'teacher';
}

export const defaultSession: User = {
  isLoggedIn: false,
  name: "",
  email: "",
  role: "user",
};

export const sessionOptions: SessionOptions = {
  password: "complex_password_at_least_32_characters_long",
  cookieName: "edu_quest_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
