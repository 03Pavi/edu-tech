import * as bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { User, UserRole } from "@prisma/client";

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    name?: string;
    role?: UserRole;
  }): Promise<Omit<User, 'password'>> {
    console.log(data, 'register data');

    if (!data.email || !data.password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role || UserRole.STUDENT,
      },
    });

    const { password, ...result } = newUser;
    return result;
  }

  async login(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        return null;
      }

      if (!user.password) {
        console.error("User found but password field is missing:", user);
        throw new Error("Password field not loaded from database");
      }

      const isMatch = await bcrypt.compare(pass, user.password);
      if (!isMatch) {
        return null;
      }

      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.error("Login method error:", error);
      throw error;
    }
  }
}
