import { DeepPartial } from "typeorm";

export interface IRepository<T extends { id: number }> {
  create(data: DeepPartial<T>): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: T["id"]): Promise<T | null>;
  update(id: T["id"], data: DeepPartial<T>): Promise<T | null>;
  delete(id: T["id"]): Promise<boolean>;
}
