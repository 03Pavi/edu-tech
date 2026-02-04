import { NextResponse } from "next/server";
import { BannerService } from "../../services/banner.service";
import { getIronSession } from "iron-session";
import { sessionOptions, User as SessionUser } from "../../infrastructure/auth/session";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const bannerService = new BannerService();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const fetchAll = searchParams.get('all') === 'true';

    if (fetchAll) {
      const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
      if (session.isLoggedIn && session.role === 'ADMIN') {
        const banners = await bannerService.getAllBanners();
        return NextResponse.json(banners);
      }
    }

    const banners = await bannerService.getActiveBanners();
    return NextResponse.json(banners);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getIronSession<SessionUser>(await cookies(), sessionOptions);
    if (!session.isLoggedIn || session.role !== 'ADMIN') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const banner = await bannerService.createBanner(body);
    return NextResponse.json(banner, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
