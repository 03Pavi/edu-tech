import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../../infrastructure/auth/session";
import { cookies } from "next/headers";
import "reflect-metadata";
import { CourseService } from "../../../services/course.service";
import { getDataSource } from "../../../infrastructure/database/data-source";

export const dynamic = "force-dynamic";

const courseService = new CourseService();

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await getDataSource();
  try {
    const { id } = await params;
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);

    let course: any = await courseService.getCourseById(parseInt(id));

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    let isJoined = false;
    if (session.isLoggedIn) {
      isJoined = await courseService.checkUserEnrollment(course.id, session.id);
    }

    return NextResponse.json({ ...course, isJoined });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
