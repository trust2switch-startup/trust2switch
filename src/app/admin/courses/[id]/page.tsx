"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";
import { CurriculumEditor } from "@/components/admin/CurriculumEditor";
import { StringListEditor } from "@/components/admin/StringListEditor";
import { ArrayObjectEditor, FieldConfig } from "@/components/admin/ArrayObjectEditor";
import { Copy, ClipboardPaste } from "lucide-react";

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    description: "",
    longDescription: "",
    instructor: {
      name: "",
      role: "",
      image: "",
      bio: "",
    },
    image: "",
    category: "",
    level: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    duration: "",
    price: 0,
    originalPrice: null as number | null,
    rating: 0,
    reviews: 0,
    students: 0,
    language: "English",
    features: [] as string[],
    bulletPoints: [] as string[],
    whoCanApply: [] as string[],
    tags: "",
    isPopular: false,
    isNew: false,
    curriculum: [] as any[],
    programHighlights: [] as any[],
    projects: [] as any[],
    skills: [] as any[],
    comparisonData: [] as any[],
    careerTransitions: [] as any[],
    faqs: [] as any[],
    brochureDownloadLink: "",
    noCostEMIAmount: "",
    admissionDeadlineDate: "",
    jobDescriptionsLink: "",
  });

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const fetchCourse = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        const course = data.data;
        setFormData({
          slug: course.slug || "",
          title: course.title || "",
          description: course.description || "",
          longDescription: course.longDescription || "",
          instructor: {
            name: course.instructor?.name || "",
            role: course.instructor?.role || "",
            image: course.instructor?.image || "",
            bio: course.instructor?.bio || "",
          },
          image: course.image || "",
          category: course.category || "",
          level: course.level || "Beginner",
          duration: course.duration || "",
          price: course.price || 0,
          originalPrice: course.originalPrice || null,
          rating: course.rating || 0,
          reviews: course.reviews || 0,
          students: course.students || 0,
          language: course.language || "English",
          features: Array.isArray(course.features) ? course.features : [],
          bulletPoints: Array.isArray(course.bulletPoints) ? course.bulletPoints : [],
          whoCanApply: Array.isArray(course.whoCanApply) ? course.whoCanApply : [],
          tags: Array.isArray(course.tags) ? course.tags.join(", ") : "",
          isPopular: course.isPopular || false,
          isNew: course.isNew || false,
          curriculum: course.curriculum || [],
          programHighlights: course.programHighlights || [],
          projects: course.projects || [],
          skills: course.skills || [],
          comparisonData: course.comparisonData || [],
          careerTransitions: (course.careerTransitions || []).map((t: any) => ({
            ...t,
            review: t.review || "",
            video: t.video || "",
          })),
          faqs: course.faqs || [],
          brochureDownloadLink: course.brochureDownloadLink || "",
          noCostEMIAmount: course.noCostEMIAmount || "",
          admissionDeadlineDate: course.admissionDeadlineDate || "",
          jobDescriptionsLink: course.jobDescriptionsLink || "",
        });
      } else {
        showToast("Failed to load course", "error");
        router.push("/admin/courses");
      }
    } catch (error) {
      showToast("An error occurred while loading the course", "error");
      router.push("/admin/courses");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith("instructor.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [field]: value,
        },
      }));
    } else if (type === "number") {
      const numValue = value === "" ? 0 : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const token = localStorage.getItem("admin_token");

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        ...formData,
        tags: tagsArray,
        originalPrice: formData.originalPrice || null,
      };

      const response = await fetch(`/api/courses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Course updated successfully!", "success");
        // No redirection, stay on page
      } else {
        showToast(data.message || "Failed to update course", "error");
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error: any) {
      showToast(
        error.message || "An error occurred. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  const handleArrayChange = (field: keyof typeof formData, value: any[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCopySection = (data: any, label: string) => {
    try {
      const dataStr = JSON.stringify(data);
      navigator.clipboard.writeText(dataStr);
      showToast(`${label} copied to clipboard!`, "success");
    } catch (err) {
      showToast("Failed to copy to clipboard", "error");
    }
  };

  const handlePasteSection = async (field: keyof typeof formData, label: string) => {
    try {
      const text = await navigator.clipboard.readText();
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        setFormData((prev) => ({ ...prev, [field]: data }));
        showToast(`${label} pasted successfully!`, "success");
      } else {
        showToast("Invalid data format in clipboard (expected array)", "error");
      }
    } catch (err) {
      showToast("Failed to paste from clipboard (invalid JSON)", "error");
    }
  };

  // Field configurations for ArrayObjectEditor
  const programHighlightFields: FieldConfig[] = [
    { name: "icon", label: "Icon Name (Lucide)", type: "text", required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    { name: "gradient", label: "Gradient CSS", type: "text", required: true, placeholder: "from-[#84994F] to-[#84994F]" },
  ];

  const projectFields: FieldConfig[] = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
  ];

  const skillFields: FieldConfig[] = [
    { name: "name", label: "Skill Name", type: "text", required: true },
    { name: "icon", label: "Icon Name", type: "text", required: true },
  ];

  const comparisonFields: FieldConfig[] = [
    { name: "category", label: "Category", type: "text", required: true },
    { name: "trust2switch", label: "Trust2Switch Feature", type: "text", required: true },
    { name: "otherCourses", label: "Other Courses", type: "text", required: true },
  ];

  const careerFields: FieldConfig[] = [
    { name: "name", label: "Student Name", type: "text", required: true },
    { name: "review", label: "Review/Feedback", type: "textarea", required: true },
    { name: "video", label: "Video URL", type: "text", required: false },
    { name: "newCompany", label: "Company Name", type: "text", required: false },
    { name: "newRole", label: "Role", type: "text", required: false },
    { name: "companyLogo", label: "Company Logo URL", type: "text", required: false },
    { name: "image", label: "Student Image URL", type: "text", required: false },
    // Hidden fields preserved for data integrity but not shown in UI as per request
    // { name: "hike", label: "Hike %", type: "text", required: false },
    // { name: "field", label: "Field", type: "text", required: false },
    // { name: "previousRole", label: "Previous Role", type: "text", required: false },
    // { name: "previousCompany", label: "Previous Company", type: "text", required: false },
  ];

  const faqFields: FieldConfig[] = [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Answer", type: "textarea", required: true },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        <p className="mt-1 text-sm text-gray-500">Update the course details</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white shadow rounded-lg p-6"
      >
        {/* Basic Information */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormInput
              label="Slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
              error={errors.slug}
              description="URL-friendly identifier"
            />
            <FormInput
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              error={errors.title}
            />
          </div>

          <div className="mt-4">
            <FormTextarea
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              error={errors.description}
              rows={3}
            />
          </div>

          <div className="mt-4">
            <FormTextarea
              label="Long Description"
              name="longDescription"
              value={formData.longDescription}
              onChange={handleChange}
              required
              error={errors.longDescription}
              rows={5}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-4">
            <FormInput
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              error={errors.image}
            />
            <FormInput
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              error={errors.category}
            />
          </div>
        </section>

        {/* Course Details */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Course Details</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FormSelect
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              error={errors.level}
              options={[
                { value: "Beginner", label: "Beginner" },
                { value: "Intermediate", label: "Intermediate" },
                { value: "Advanced", label: "Advanced" },
              ]}
            />
            <FormInput
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              error={errors.duration}
              placeholder="e.g., '12 weeks'"
            />
            <FormInput
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              required
              error={errors.language}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 mt-4">
            <FormInput
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              error={errors.price}
            />
            <FormInput
              label="Original Price"
              name="originalPrice"
              type="number"
              value={formData.originalPrice || ""}
              onChange={handleChange}
              error={errors.originalPrice}
              description="Optional"
            />
            <FormInput
              label="Rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              required
              error={errors.rating}
            />
            <FormInput
              label="Reviews"
              name="reviews"
              type="number"
              value={formData.reviews}
              onChange={handleChange}
              required
              error={errors.reviews}
            />
          </div>

          <div className="mt-4">
            <FormInput
              label="Students"
              name="students"
              type="number"
              value={formData.students}
              onChange={handleChange}
              required
              error={errors.students}
            />
          </div>

          <div className="mt-4">
            <FormInput
              label="Tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              error={errors.tags}
              description="Comma-separated tags"
            />
          </div>

          <div className="flex items-center gap-6 mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Mark as Popular</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Mark as New</span>
            </label>
          </div>
        </section>

        {/* Links and Dates */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Links & Additional Info</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormInput
              label="Brochure Download Link"
              name="brochureDownloadLink"
              value={formData.brochureDownloadLink}
              onChange={handleChange}
            />
            <FormInput
              label="Job Descriptions Link"
              name="jobDescriptionsLink"
              value={formData.jobDescriptionsLink}
              onChange={handleChange}
            />
            <FormInput
              label="No Cost EMI Amount"
              name="noCostEMIAmount"
              value={formData.noCostEMIAmount}
              onChange={handleChange}
            />
            <FormInput
              label="Admission Deadline"
              name="admissionDeadlineDate"
              value={formData.admissionDeadlineDate}
              onChange={handleChange}
            />
          </div>
        </section>

        {/* Instructor */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Instructor</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormInput
              label="Instructor Name"
              name="instructor.name"
              value={formData.instructor.name}
              onChange={handleChange}
              required
              error={errors["instructor.name"]}
            />
            <FormInput
              label="Instructor Role"
              name="instructor.role"
              value={formData.instructor.role}
              onChange={handleChange}
              required
              error={errors["instructor.role"]}
            />
            <FormInput
              label="Instructor Image URL"
              name="instructor.image"
              value={formData.instructor.image}
              onChange={handleChange}
              required
              error={errors["instructor.image"]}
            />
            <FormTextarea
              label="Instructor Bio"
              name="instructor.bio"
              value={formData.instructor.bio}
              onChange={handleChange}
              required
              error={errors["instructor.bio"]}
              rows={3}
            />
          </div>
        </section>

        {/* Lists: Features, Bullet Points, Who Can Apply */}
        <section>
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Key Features & Lists</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const data = {
                    features: formData.features,
                    bulletPoints: formData.bulletPoints,
                    whoCanApply: formData.whoCanApply
                  };
                  handleCopySection(data, "Lists");
                }}
                className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"
              >
                <Copy className="w-3 h-3" /> Copy All
              </button>
            </div>
          </div>
          <div className="space-y-6">
            <StringListEditor
              label="Features"
              value={formData.features}
              onChange={(val) => handleArrayChange('features', val)}
              placeholder="Enter feature"
            />
            <StringListEditor
              label="Bullet Points"
              value={formData.bulletPoints}
              onChange={(val) => handleArrayChange('bulletPoints', val)}
              placeholder="Enter bullet point"
            />
            <StringListEditor
              label="Who Can Apply"
              value={formData.whoCanApply}
              onChange={(val) => handleArrayChange('whoCanApply', val)}
              placeholder="Criteria for application"
            />
          </div>
        </section>

        {/* Complex Arrays */}
        <section>
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Program Highlights & Projects</h2>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute right-0 top-0 -mt-10 flex gap-2">
                <button type="button" onClick={() => handleCopySection(formData.programHighlights, "Highlights")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
                <button type="button" onClick={() => handlePasteSection('programHighlights', "Highlights")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
              </div>
              <ArrayObjectEditor
                label="Program Highlights"
                itemName="Highlight"
                value={formData.programHighlights}
                onChange={(val) => handleArrayChange('programHighlights', val)}
                fields={programHighlightFields}
              />
            </div>
            <div className="relative">
              <div className="absolute right-0 top-0 -mt-10 flex gap-2">
                <button type="button" onClick={() => handleCopySection(formData.projects, "Projects")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
                <button type="button" onClick={() => handlePasteSection('projects', "Projects")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
              </div>
              <ArrayObjectEditor
                label="Projects"
                itemName="Project"
                value={formData.projects}
                onChange={(val) => handleArrayChange('projects', val)}
                fields={projectFields}
              />
            </div>
            <div className="relative">
              <div className="absolute right-0 top-0 -mt-10 flex gap-2">
                <button type="button" onClick={() => handleCopySection(formData.skills, "Skills")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
                <button type="button" onClick={() => handlePasteSection('skills', "Skills")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
              </div>
              <ArrayObjectEditor
                label="Skills"
                itemName="Skill"
                value={formData.skills}
                onChange={(val) => handleArrayChange('skills', val)}
                fields={skillFields}
              />
            </div>
          </div>
        </section>

        {/* Comparison Data */}
        <section>
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Comparison & Career</h2>
          </div>
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute right-0 top-0 -mt-10 flex gap-2">
                <button type="button" onClick={() => handleCopySection(formData.comparisonData, "Comparison")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
                <button type="button" onClick={() => handlePasteSection('comparisonData', "Comparison")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
              </div>
              <ArrayObjectEditor
                label="Comparison with Other Courses"
                itemName="Row"
                value={formData.comparisonData}
                onChange={(val) => handleArrayChange('comparisonData', val)}
                fields={comparisonFields}
                titleField="category"
              />
            </div>
            <div className="relative">
              <div className="absolute right-0 top-0 -mt-10 flex gap-2">
                <button type="button" onClick={() => handleCopySection(formData.careerTransitions, "Career")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
                <button type="button" onClick={() => handlePasteSection('careerTransitions', "Career")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
              </div>
              <ArrayObjectEditor
                label="Career Transitions"
                itemName="Success Story"
                value={formData.careerTransitions}
                onChange={(val) => handleArrayChange('careerTransitions', val)}
                fields={careerFields}
                titleField="name"
              />
            </div>
          </div>
        </section>

        {/* Curriculum */}
        <section>
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Curriculum</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleCopySection(formData.curriculum, "Curriculum")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
              <button type="button" onClick={() => handlePasteSection('curriculum', "Curriculum")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
            </div>
          </div>
          <CurriculumEditor
            value={formData.curriculum}
            onChange={(newCurriculum) =>
              setFormData((prev) => ({ ...prev, curriculum: newCurriculum }))
            }
            error={errors.curriculum}
          />
        </section>

        {/* FAQs */}
        <section>
          <div className="flex items-center justify-between border-b pb-2 mb-4">
            <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
            <div className="flex gap-2">
              <button type="button" onClick={() => handleCopySection(formData.faqs, "FAQs")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><Copy className="w-3 h-3" /> Copy</button>
              <button type="button" onClick={() => handlePasteSection('faqs', "FAQs")} className="text-xs flex items-center gap-1 text-gray-600 hover:text-indigo-600"><ClipboardPaste className="w-3 h-3" /> Paste</button>
            </div>
          </div>
          <ArrayObjectEditor
            label="FAQs"
            itemName="FAQ"
            value={formData.faqs}
            onChange={(val) => handleArrayChange('faqs', val)}
            fields={faqFields}
            titleField="question"
          />
        </section>

        <div className="flex justify-end gap-3 pt-6 border-t sticky bottom-0 bg-white p-4 shadow-t mt-8 z-10">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Course"}
          </button>
        </div>
      </form>
    </div>
  );
}

