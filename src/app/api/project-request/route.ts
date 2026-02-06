
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";

const projectRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
    email: z.string().email("Invalid email address"),
    projectTechStack: z.string().min(1, "Tech stack is required"),
    projectRequirement: z.string().optional(),
    college: z.string().min(1, "College name is required"),
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const validatedData = projectRequestSchema.parse(body);

        const projectRequest = await prisma.projectRequest.create({
            data: validatedData,
        });

        return NextResponse.json(
            { message: "Project request submitted successfully", data: projectRequest },
            { status: 201 }
        );
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Validation error", errors: (error as any).errors },
                { status: 400 }
            );
        }
        console.error("Error submitting project request:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
