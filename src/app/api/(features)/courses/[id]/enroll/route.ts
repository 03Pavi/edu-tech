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
    if (!session.isLoggedIn) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const { id } = await params;
    await courseService.enrollUser(parseInt(id), session.id);

    return NextResponse.json({ message: "Successfully enrolled" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
