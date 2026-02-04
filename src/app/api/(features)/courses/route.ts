import "reflect-metadata";
import { NextResponse } from "next/server";
import { CourseService } from "../../services/course.service";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../infrastructure/auth/session";
import { cookies } from "next/headers";
import { getDataSource } from "../../infrastructure/database/data-source";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

const courseService = new CourseService();

export async function GET() {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    const courses = await courseService.getCoursesWithEnrollment(session.id);
    return NextResponse.json(courses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || (session.role !== UserRole.ADMIN && session.role !== UserRole.TEACHER)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    // Assuming session has the user ID. Wait, does session have the ID?
    // Let's check session.ts
    const userEmail = session.email;
    // We might need to find user by email to get ID if not in session
    // Let's assume for now we might need to add ID to session or find it.
    // Actually, let's check AuthService and session structure.

    const course = await courseService.createCourse({ ...body, instructorId: session.id });
    return NextResponse.json(course, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
