"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

const projectRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  projectTechStack: z.string().min(1, "Tech stack is required"),
  projectRequirement: z.string().optional(),
  college: z.string().min(1, "College name is required"),
});

type ProjectRequestFormValues = z.infer<typeof projectRequestSchema>;

export default function ProjectsPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProjectRequestFormValues>({
    resolver: zodResolver(projectRequestSchema),
  });

  const onSubmit = async (data: ProjectRequestFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch("/api/project-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit request");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative max-w-4xl w-full bg-slate-900/70 backdrop-blur border border-white/10 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
          <div className="md:col-span-2 p-8 sm:p-10 border-b md:border-b-0 md:border-r border-white/10">
            <h2 className="text-3xl font-semibold text-white">
              Request a Project
            </h2>
            <p className="mt-3 text-sm text-slate-300">
              Tell us about your project. We&apos;ll review the details and respond within 24-48 hours.
            </p>
            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300">
                  1
                </span>
                <p>Share your contact info so we can reach you quickly.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/10 text-sky-300">
                  2
                </span>
                <p>Tell us the tech stack and requirements you prefer.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/10 text-purple-300">
                  3
                </span>
                <p>We&apos;ll propose a plan and timeline that fits.</p>
              </div>
            </div>
            <p className="mt-8 text-xs text-slate-400">
              We respect your privacy. Your details are only used to respond to this request.
            </p>
          </div>

          <div className="md:col-span-3 p-8 sm:p-10">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">Project Details</h3>
              <p className="mt-1 text-sm text-slate-400">
                Please fill in the form below. Fields marked with * are required.
              </p>
            </div>

            {submitSuccess ? (
              <div className="rounded-xl bg-emerald-900/30 p-6 border border-emerald-700/40">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-emerald-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-emerald-100">
                      Request Submitted!
                    </h3>
                    <div className="mt-2 text-sm text-emerald-200">
                      <p>
                        Thank you. Your project request has been received. We will contact you shortly.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="text-sm font-medium text-emerald-300 hover:text-emerald-200"
                      >
                        Submit another request &rarr;
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      type="text"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                      className="mt-1 block w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 sm:text-sm transition"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-rose-400">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="mobile" className="block text-sm font-medium text-slate-200">
                      Mobile Number *
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      aria-invalid={!!errors.mobile}
                      {...register("mobile")}
                      className="mt-1 block w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 sm:text-sm transition"
                      placeholder="+91 9876543210"
                    />
                    {errors.mobile && (
                      <p className="mt-1 text-sm text-rose-400">{errors.mobile.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                      className="mt-1 block w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 sm:text-sm transition"
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-rose-400">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="college" className="block text-sm font-medium text-slate-200">
                      College / University *
                    </label>
                    <input
                      id="college"
                      type="text"
                      aria-invalid={!!errors.college}
                      {...register("college")}
                      className="mt-1 block w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 sm:text-sm transition"
                      placeholder="Institute of Technology"
                    />
                    {errors.college && (
                      <p className="mt-1 text-sm text-rose-400">{errors.college.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="projectTechStack" className="block text-sm font-medium text-slate-200">
                    Preferred Tech Stack *
                  </label>
                  <input
                    id="projectTechStack"
                    type="text"
                    aria-invalid={!!errors.projectTechStack}
                    {...register("projectTechStack")}
                    className="mt-1 block w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 sm:text-sm transition"
                    placeholder="React, Node.js, Python, etc."
                  />
                  {errors.projectTechStack && (
                    <p className="mt-1 text-sm text-rose-400">{errors.projectTechStack.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="projectRequirement" className="block text-sm font-medium text-slate-200">
                    Project Requirements <span className="text-slate-500">(Optional)</span>
                  </label>
                  <textarea
                    id="projectRequirement"
                    rows={4}
                    {...register("projectRequirement")}
                    className="mt-1 block w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-400/60 focus:border-emerald-400/60 sm:text-sm transition"
                    placeholder="Describe your project idea or requirements..."
                  />
                </div>

                {submitError && (
                  <div className="text-rose-400 text-sm text-center bg-rose-900/20 p-2 rounded-lg border border-rose-700/30">
                    {submitError}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-medium rounded-lg text-white bg-[#84994F] hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-400/60 disabled:opacity-60 disabled:cursor-not-allowed transition shadow-lg shadow-green-900/30"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin h-4 w-4" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Request"
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
