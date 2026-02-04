-- Create Enums
DO $$ BEGIN
    CREATE TYPE "users_role_enum" AS ENUM('admin', 'teacher', 'student');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Users Table
CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR UNIQUE NOT NULL,
    "password" VARCHAR NOT NULL,
    "name" VARCHAR,
    "role" "users_role_enum" NOT NULL DEFAULT 'student',
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now()
);

-- Create Courses Table
CREATE TABLE IF NOT EXISTS "courses" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "price" INTEGER DEFAULT 0,
    "thumbnail" VARCHAR,
    "instructorId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    CONSTRAINT "FK_courses_instructor" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE SET NULL
);

-- Create Course Enrollments (ManyToMany)
CREATE TABLE IF NOT EXISTS "course_enrollments" (
    "courseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    PRIMARY KEY ("courseId", "userId"),
    CONSTRAINT "FK_enrollment_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_enrollment_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
);

-- Create Live Classes
CREATE TABLE IF NOT EXISTS "live_classes" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "startTime" TIMESTAMP NOT NULL,
    "endTime" TIMESTAMP NOT NULL,
    "meetingLink" VARCHAR,
    "courseId" INTEGER,
    "instructorId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    CONSTRAINT "FK_live_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE,
    CONSTRAINT "FK_live_instructor" FOREIGN KEY ("instructorId") REFERENCES "users"("id") ON DELETE SET NULL
);

-- Create Notes
CREATE TABLE IF NOT EXISTS "notes" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "contentUrl" VARCHAR,
    "description" TEXT,
    "courseId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    CONSTRAINT "FK_notes_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE
);

-- Create Recorded Classes
CREATE TABLE IF NOT EXISTS "recorded_classes" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "videoUrl" VARCHAR,
    "duration" VARCHAR,
    "description" TEXT,
    "courseId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    CONSTRAINT "FK_recorded_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE
);

-- Create Test Series
CREATE TABLE IF NOT EXISTS "test_series" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR NOT NULL,
    "description" TEXT,
    "durationInMinutes" INTEGER DEFAULT 0,
    "courseId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    CONSTRAINT "FK_test_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL
);

-- Create Questions
CREATE TABLE IF NOT EXISTS "questions" (
    "id" SERIAL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "options" JSON NOT NULL,
    "correctAnswer" VARCHAR NOT NULL,
    "explanation" TEXT,
    "testSeriesId" INTEGER,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now(),
    CONSTRAINT "FK_questions_test" FOREIGN KEY ("testSeriesId") REFERENCES "test_series"("id") ON DELETE CASCADE
);

-- Create Banners
CREATE TABLE IF NOT EXISTS "banners" (
    "id" SERIAL PRIMARY KEY,
    "text" VARCHAR NOT NULL,
    "link" VARCHAR,
    "buttonText" VARCHAR,
    "isActive" BOOLEAN DEFAULT true,
    "backgroundColor" VARCHAR,
    "textColor" VARCHAR,
    "createdAt" TIMESTAMP DEFAULT now(),
    "updatedAt" TIMESTAMP DEFAULT now()
);
