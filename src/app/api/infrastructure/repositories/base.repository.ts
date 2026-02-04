import "reflect-metadata";
import { Repository, EntityTarget, DeepPartial } from "typeorm";
import { IRepository } from "../../domain/interfaces/repository.interface";
import { AppDataSource } from "../database/data-source";

export abstract class BaseRepository<T extends { id: number }>
  implements IRepository<T> {
  constructor(private readonly entity: EntityTarget<T>) { }

  protected get repo(): Repository<T> {
    if (!AppDataSource.isInitialized) {
      throw new Error(
        "DataSource not initialized. Initialize it in the route/service before using repositories."
      );
    }
    return AppDataSource.getRepository(this.entity);
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async findAll(): Promise<T[]> {
    return this.repo.find();
  }

  async findById(id: T["id"]): Promise<T | null> {
    return this.repo.findOneBy({ id } as any);
  }

  async update(id: T["id"], data: DeepPartial<T>): Promise<T | null> {
    await this.repo.update(id, data as any);
    return this.findById(id);
  }

  async delete(id: T["id"]): Promise<boolean> {
    const result = await this.repo.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
