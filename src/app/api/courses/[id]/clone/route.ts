import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { withAuth } from "@/lib/auth/middleware";

export const POST = withAuth(async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        const { id } = await params;

        const originalCourse = await prisma.course.findUnique({
            where: { id },
        });

        if (!originalCourse) {
            return NextResponse.json(
                { success: false, message: "Course not found" },
                { status: 404 }
            );
        }

        // Create new object by excluding system fields
        const { id: _, createdAt, updatedAt, ...rest } = originalCourse;

        // Create unique slug and title
        const timestamp = Date.now();
        const title = `Copy of ${rest.title}`;
        const slug = `${rest.slug}-copy-${timestamp}`;

        const courseData = {
            ...rest,
            title,
            slug,
            isNew: true,
            // Ensure JSON fields are passed correctly (Prisma handles object types automatically, checking strictly for type safety might be needed but usually spread works if types align)
            // Explicitly casting JSON fields if needed, but 'rest' should have them as objects/arrays
        };

        const newCourse = await prisma.course.create({
            data: courseData as any, // Using as any to avoid strict typing issues with Json fields if there's a slight mismatch, but generally safe here
        });

        return NextResponse.json({
            success: true,
            message: "Course cloned successfully",
            data: newCourse,
        });
    } catch (error: any) {
        console.error("Error cloning course:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Failed to clone course" },
            { status: 500 }
        );
    }
});
