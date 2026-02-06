import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db/prisma";
import { sendProjectRequestAdminEmail, sendProjectRequestUserConfirmationEmail } from "@/lib/email";

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

    // Send emails asynchronously (don't block response)
    (async () => {
      try {
        console.log("Attempting to send project request emails...");

        // Send admin notification
        const adminEmailResult = await sendProjectRequestAdminEmail(validatedData);
        if (adminEmailResult.success) {
          console.log("Project request admin email sent successfully");
        } else {
          console.error("Failed to send project request admin email:", adminEmailResult.error);
        }

        // Send user confirmation
        const userEmailResult = await sendProjectRequestUserConfirmationEmail(
          validatedData.email,
          validatedData.name
        );
        if (userEmailResult.success) {
          console.log("Project request user confirmation email sent successfully");
        } else {
          console.error("Failed to send project request user confirmation email:", userEmailResult.error);
        }
      } catch (emailError) {
        console.error("Unexpected error sending project request emails:", emailError);
      }
    })();

    return NextResponse.json(
      {
        message: "Project request submitted successfully",
        data: projectRequest,
      },
      { status: 201 },
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: (error as any).errors },
        { status: 400 },
      );
    }
    console.error("Error submitting project request:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
