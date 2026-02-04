import { NextResponse } from "next/server";
import "reflect-metadata";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../../../infrastructure/auth/session";
import { getDataSource } from "../../../../infrastructure/database/data-source";
import { CourseService } from "../../../../services/course.service";
import { cookies } from "next/headers";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

const courseService = new CourseService();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || (session.role !== UserRole.ADMIN && session.role !== UserRole.TEACHER)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const liveClass = await courseService.addLiveClass(parseInt(id), body);
    return NextResponse.json(liveClass, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
