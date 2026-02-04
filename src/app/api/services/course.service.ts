import prisma from "@/lib/prisma";
import { Course } from "@prisma/client";

export class CourseService {
  async createCourse(data: {
    title: string;
    description?: string;
    price?: number;
    thumbnail?: string;
    instructorId?: number;
  }): Promise<Course> {
    return await prisma.course.create({
      data,
      include: {
        instructor: true,
      },
    });
  }

  async getAllCourses(): Promise<any[]> {
    return await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCoursesWithEnrollment(userId: number): Promise<any[]> {
    const courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        students: {
          where: {
            userId: userId,
          },
        },
        _count: {
          select: {
            students: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // Transform the data to include enrollment status
    return courses.map(course => ({
      ...course,
      isEnrolled: course.students.length > 0,
      enrollmentDate: course.students[0]?.createdAt || null,
      students: undefined, // Remove the students array from response
    }));
  }

  async getCourseById(id: number): Promise<Course | null> {
    return await prisma.course.findUnique({
      where: { id },
      include: {
        instructor: true,
        students: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        liveClasses: true,
        recordedClasses: true,
        notes: true,
        testSeries: true,
      },
    });
  }

  async updateCourse(id: number, data: Partial<Course>): Promise<Course> {
    return await prisma.course.update({
      where: { id },
      data,
    });
  }

  async deleteCourse(id: number): Promise<void> {
    await prisma.course.delete({
      where: { id },
    });
  }

  async enrollUser(courseId: number, userId: number): Promise<void> {
    await prisma.courseEnrollment.create({
      data: {
        courseId,
        userId,
      },
    });
  }

  async isUserEnrolled(courseId: number, userId: number): Promise<boolean> {
    const enrollment = await prisma.courseEnrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
    return !!enrollment;
  }

  async addLiveClass(courseId: number, data: {
    title: string;
    description?: string;
    scheduledAt: string | Date;
    meetingLink?: string;
  }) {
    return await prisma.liveClass.create({
      data: {
        title: data.title,
        description: data.description,
        scheduledAt: new Date(data.scheduledAt),
        meetingLink: data.meetingLink,
        courseId,
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
  }
}
