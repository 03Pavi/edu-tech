import { NextResponse } from "next/server";
import "reflect-metadata";
import { TestSeriesService } from "../../services/test-series.service";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../infrastructure/auth/session";
import { cookies } from "next/headers";
import { getDataSource } from "../../infrastructure/database/data-source";
import { UserRole } from "@prisma/client";

export const dynamic = "force-dynamic";

const testSeriesService = new TestSeriesService();

export async function GET() {
  await getDataSource();
  try {
    const series = await testSeriesService.getAllTestSeries();
    return NextResponse.json(series);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || session.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Only admins can create test series" }, { status: 403 });
    }

    const body = await req.json();
    const series = await testSeriesService.createTestSeries(body);
    return NextResponse.json(series, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
