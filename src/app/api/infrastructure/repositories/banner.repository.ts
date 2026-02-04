import { BaseRepository } from "./base.repository";
import { Banner } from "../database/entities/cms/banner.entity";

export class BannerRepository extends BaseRepository<Banner> {
  constructor() {
    super(Banner);
  }

  async findActiveBanners(): Promise<Banner[]> {
    return this.repo.find({
      where: { isActive: true },
      order: { createdAt: "DESC" }
    });
  }
}
