import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../../infrastructure/auth/session";
import { cookies } from "next/headers";
import "reflect-metadata";
import { BannerService } from "../../../services/banner.service";
import { getDataSource } from "../../../infrastructure/database/data-source";

export const dynamic = "force-dynamic";

const bannerService = new BannerService();

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || session.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const banner = await bannerService.updateBanner(parseInt(id), body);

    if (!banner) {
      return NextResponse.json({ error: "Banner not found" }, { status: 404 });
    }

    return NextResponse.json(banner);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await getDataSource();
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || session.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await bannerService.deleteBanner(parseInt(id));

    return NextResponse.json({ message: "Banner deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
