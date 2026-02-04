import prisma from "@/lib/prisma";
import { Banner } from "@prisma/client";

export class BannerService {
  async createBanner(data: {
    text: string;
    link?: string;
    buttonText?: string;
    isActive?: boolean;
    backgroundColor?: string;
    textColor?: string;
  }): Promise<Banner> {
    return await prisma.banner.create({
      data,
    });
  }

  async getAllBanners(): Promise<Banner[]> {
    return await prisma.banner.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getActiveBanners(): Promise<Banner[]> {
    return await prisma.banner.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  async updateBanner(id: number, data: Partial<Banner>): Promise<Banner | null> {
    return await prisma.banner.update({
      where: { id },
      data,
    });
  }

  async deleteBanner(id: number): Promise<void> {
    await prisma.banner.delete({
      where: { id },
    });
  }
}
