import { NextResponse } from "next/server";
import "reflect-metadata";
import { CourseService } from "../../../../services/course.service";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../../../infrastructure/auth/session";
import { cookies } from "next/headers";
import { getDataSource } from "../../../../infrastructure/database/data-source";

export const dynamic = "force-dynamic";

const courseService = new CourseService();

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || (session.role !== 'admin' && session.role !== 'teacher')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    const note = await courseService.addNote(parseInt(id), body);
    return NextResponse.json(note, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
