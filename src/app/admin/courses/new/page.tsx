'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormTextarea, FormSelect } from '@/components/admin/FormField';
import { useToast } from '@/components/admin/Toast';
import { CurriculumEditor } from "@/components/admin/CurriculumEditor";
import { StringListEditor } from "@/components/admin/StringListEditor";
import { ArrayObjectEditor, FieldConfig } from "@/components/admin/ArrayObjectEditor";

export default function NewCoursePage() {
  const router = useRouter();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    slug: '',
    title: '',
    description: '',
    longDescription: '',
    instructor: {
      name: '',
      role: '',
      image: '',
      bio: '',
    },
    image: '',
    category: '',
    level: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    duration: '',
    price: 0,
    originalPrice: null as number | null,
    rating: 0,
    reviews: 0,
    students: 0,
    language: 'English',
    features: [] as string[],
    bulletPoints: [] as string[],
    whoCanApply: [] as string[],
    tags: '',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    // Handle checkbox separately
    const checked = (e.target as HTMLInputElement).checked;

    if (name.startsWith('instructor.')) {
      const field = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        instructor: {
          ...prev.instructor,
          [field]: value,
        },
      }));
    } else if (type === 'number') {
      const numValue = value === '' ? 0 : parseFloat(value);
      setFormData((prev) => ({ ...prev, [name]: numValue }));
    } else if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleArrayChange = (field: keyof typeof formData, value: any[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');

      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        ...formData,
        tags: tagsArray,
        originalPrice: formData.originalPrice || null,
      };

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showToast('Course created successfully!', 'success');
        setTimeout(() => {
          router.push('/admin/courses');
        }, 1000);
      } else {
        showToast(data.message || 'Failed to create course', 'error');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error: any) {
      showToast(error.message || 'An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
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
  ];

  const faqFields: FieldConfig[] = [
    { name: "question", label: "Question", type: "text", required: true },
    { name: "answer", label: "Answer", type: "textarea", required: true },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Course</h1>
        <p className="mt-1 text-sm text-gray-500">Fill in the details to create a new course</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow rounded-lg p-6">
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
                { value: 'Beginner', label: 'Beginner' },
                { value: 'Intermediate', label: 'Intermediate' },
                { value: 'Advanced', label: 'Advanced' },
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
              value={formData.originalPrice || ''}
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
              error={errors['instructor.name']}
            />
            <FormInput
              label="Instructor Role"
              name="instructor.role"
              value={formData.instructor.role}
              onChange={handleChange}
              required
              error={errors['instructor.role']}
            />
            <FormInput
              label="Instructor Image URL"
              name="instructor.image"
              value={formData.instructor.image}
              onChange={handleChange}
              required
              error={errors['instructor.image']}
            />
            <FormTextarea
              label="Instructor Bio"
              name="instructor.bio"
              value={formData.instructor.bio}
              onChange={handleChange}
              required
              error={errors['instructor.bio']}
              rows={3}
            />
          </div>
        </section>

        {/* Lists: Features, Bullet Points, Who Can Apply */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Key Features & Lists</h2>
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
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Program Highlights & Projects</h2>
          <div className="space-y-6">
            <ArrayObjectEditor
              label="Program Highlights"
              itemName="Highlight"
              value={formData.programHighlights}
              onChange={(val) => handleArrayChange('programHighlights', val)}
              fields={programHighlightFields}
            />
            <ArrayObjectEditor
              label="Projects"
              itemName="Project"
              value={formData.projects}
              onChange={(val) => handleArrayChange('projects', val)}
              fields={projectFields}
            />
            <ArrayObjectEditor
              label="Skills"
              itemName="Skill"
              value={formData.skills}
              onChange={(val) => handleArrayChange('skills', val)}
              fields={skillFields}
            />
          </div>
        </section>

        {/* Comparison Data */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Comparison & Career</h2>
          <div className="space-y-6">
            <ArrayObjectEditor
              label="Comparison with Other Courses"
              itemName="Row"
              value={formData.comparisonData}
              onChange={(val) => handleArrayChange('comparisonData', val)}
              fields={comparisonFields}
              titleField="category"
            />
            <ArrayObjectEditor
              label="Career Transitions"
              itemName="Success Story"
              value={formData.careerTransitions}
              onChange={(val) => handleArrayChange('careerTransitions', val)}
              fields={careerFields}
              titleField="name"
            />
          </div>
        </section>

        {/* Curriculum */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">Curriculum</h2>
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
          <h2 className="text-xl font-semibold text-gray-900 border-b pb-2 mb-4">FAQs</h2>
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
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
    </div>
  );
}

