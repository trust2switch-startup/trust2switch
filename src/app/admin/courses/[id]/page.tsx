"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";

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
    features: "",
    bulletPoints: "",
    tags: "",
    isPopular: false,
    isNew: false,
    curriculum: "",
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
          features: Array.isArray(course.features)
            ? course.features.join("\n")
            : "",
          bulletPoints: Array.isArray(course.bulletPoints)
            ? course.bulletPoints.join("\n")
            : "",
          tags: Array.isArray(course.tags) ? course.tags.join(", ") : "",
          isPopular: course.isPopular || false,
          isNew: course.isNew || false,
          curriculum: JSON.stringify(course.curriculum || [], null, 2),
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
    // Clear error when user starts typing
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

      // Parse arrays from comma-separated strings
      const featuresArray = formData.features
        .split("\n")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const bulletPointsArray = formData.bulletPoints
        .split("\n")
        .map((b) => b.trim())
        .filter((b) => b.length > 0);

      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Parse curriculum JSON
      let curriculumArray;
      try {
        curriculumArray = JSON.parse(formData.curriculum);
      } catch {
        throw new Error("Invalid curriculum JSON format");
      }

      const payload = {
        ...formData,
        features: featuresArray,
        bulletPoints: bulletPointsArray,
        tags: tagsArray,
        curriculum: curriculumArray,
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
        setTimeout(() => {
          router.push("/admin/courses");
        }, 1000);
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

  return (
    <div className="max-w-5xl mx-auto">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Course</h1>
        <p className="mt-1 text-sm text-gray-500">Update the course details</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white shadow rounded-lg p-6"
      >
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

        <FormTextarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          error={errors.description}
          rows={3}
        />

        <FormTextarea
          label="Long Description"
          name="longDescription"
          value={formData.longDescription}
          onChange={handleChange}
          required
          error={errors.longDescription}
          rows={5}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
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

        <FormInput
          label="Students"
          name="students"
          type="number"
          value={formData.students}
          onChange={handleChange}
          required
          error={errors.students}
        />

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Instructor Information
          </h3>
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
        </div>

        <FormTextarea
          label="Features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          error={errors.features}
          rows={4}
          description="One feature per line"
        />

        <FormTextarea
          label="Bullet Points"
          name="bulletPoints"
          value={formData.bulletPoints}
          onChange={handleChange}
          error={errors.bulletPoints}
          rows={4}
          description="One bullet point per line"
        />

        <FormInput
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          error={errors.tags}
          description="Comma-separated tags"
        />

        <div className="flex items-center gap-6">
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

        <FormTextarea
          label="Curriculum (JSON)"
          name="curriculum"
          value={formData.curriculum}
          onChange={handleChange}
          required
          error={errors.curriculum}
          rows={10}
          description="JSON array of curriculum weeks. Each week should have: week (number), title (string), lessons (array of {title, duration, type})"
        />

        <div className="flex justify-end gap-3 pt-6 border-t">
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
