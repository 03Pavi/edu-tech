import "reflect-metadata";
import { DataSource } from "typeorm";
import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
dotenv.config();

import { User } from "./entities/auth/user.entity";
import { Course } from "./entities/courses/course.entity";
import { LiveClass } from "./entities/courses/live-class.entity";
import { Note } from "./entities/courses/note.entity";
import { RecordedClass } from "./entities/courses/recorded-class.entity";
import { Question } from "./entities/test-series/question.entity";
import { TestSeries } from "./entities/test-series/test-series.entity";
import { Banner } from "./entities/cms/banner.entity";

const entities = [User, Course, LiveClass, Note, RecordedClass, Question, TestSeries, Banner];

const createDataSource = () => new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "edu_tech",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: entities,
  migrations: [join(__dirname, "migrations", "*.{ts,js}")],
  subscribers: [],
  ssl: !!(process.env.DB_HOST && !process.env.DB_HOST.includes('localhost')),
  extra: (process.env.DB_HOST && !process.env.DB_HOST.includes('localhost')) ? {
    ssl: {
      rejectUnauthorized: false
    }
  } : {}
});

// Guard against multiple instances in Next.js HMR
const globalForApp = global as unknown as {
  AppDataSource: DataSource;
};

export const AppDataSource = globalForApp.AppDataSource || createDataSource();

if (process.env.NODE_ENV !== "production") globalForApp.AppDataSource = AppDataSource;

export async function getDataSource() {
  try {
    if (!AppDataSource.isInitialized) {
      console.log("Initializing DataSource...");
      console.log("Entities to register:", entities.map(e => e.name));
      await AppDataSource.initialize();
      console.log("DataSource initialized successfully");
      console.log("Registered entities:", AppDataSource.entityMetadatas.map(m => m.name));
    }
    return AppDataSource;
  } catch (error: any) {
    console.error("Failed to initialize DataSource:", error);
    // If initialization fails, destroy and try again
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
    throw error;
  }
}

