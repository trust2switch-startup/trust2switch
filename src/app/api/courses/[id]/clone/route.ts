import { NextRequest, NextResponse } from "next/server";
import { ensureDatabaseConnection } from "@/lib/db/connect";
import { Course } from "@/models/Course";
import { withAuth } from "@/lib/auth/middleware";

export const POST = withAuth(async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) => {
    try {
        await ensureDatabaseConnection();
        const { id } = await params;

        const originalCourse = await Course.findById(id);

        if (!originalCourse) {
            return NextResponse.json(
                { success: false, message: "Course not found" },
                { status: 404 }
            );
        }

        const courseObj = originalCourse.toObject();

        // Create new object by excluding fields
        const { _id, __v, createdAt, updatedAt, ...rest } = courseObj as any;
        const cleanCourse = { ...rest };

        // Create unique slug and title
        const timestamp = Date.now();
        cleanCourse.title = `Copy of ${cleanCourse.title}`;
        cleanCourse.slug = `${cleanCourse.slug}-copy-${timestamp}`;
        cleanCourse.isNew = true; // Mark as new simply because it's a new entry

        const newCourse = await Course.create(cleanCourse);

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
