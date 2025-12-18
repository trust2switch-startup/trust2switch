"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  FormInput,
  FormTextarea,
  FormSelect,
} from "@/components/admin/FormField";
import { useToast } from "@/components/admin/Toast";

export default function EditBlogPostPage() {
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
    excerpt: "",
    content: "",
    author: {
      name: "",
      image: "",
      role: "",
    },
    image: "",
    category: "",
    tags: "",
    publishedAt: "",
    readTime: "",
  });

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        const post = data.data;
        setFormData({
          slug: post.slug || "",
          title: post.title || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          author: {
            name: post.author?.name || "",
            image: post.author?.image || "",
            role: post.author?.role || "",
          },
          image: post.image || "",
          category: post.category || "",
          tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
          publishedAt: post.publishedAt ? post.publishedAt.split("T")[0] : "",
          readTime: post.readTime || "",
        });
      } else {
        showToast("Failed to load blog post", "error");
        router.push("/admin/blog");
      }
    } catch (error) {
      showToast("An error occurred while loading the blog post", "error");
      router.push("/admin/blog");
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("author.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        author: {
          ...prev.author,
          [field]: value,
        },
      }));
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
      const tagsArray = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        ...formData,
        tags: tagsArray,
      };

      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Blog post updated successfully!", "success");
        setTimeout(() => {
          router.push("/admin/blog");
        }, 1000);
      } else {
        showToast(data.message || "Failed to update blog post", "error");
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
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
    <div className="max-w-4xl mx-auto">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Blog Post</h1>
        <p className="mt-1 text-sm text-gray-500">
          Update the blog post details
        </p>
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
            description="URL-friendly identifier (e.g., 'my-blog-post')"
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
          label="Excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          required
          error={errors.excerpt}
          rows={3}
          description="Short summary of the blog post"
        />

        <FormTextarea
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          error={errors.content}
          rows={10}
          description="Full blog post content (supports markdown)"
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
          <FormSelect
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            error={errors.category}
            options={[
              { value: "Technology", label: "Technology" },
              { value: "Education", label: "Education" },
              { value: "Career", label: "Career" },
              { value: "News", label: "News" },
              { value: "Tips", label: "Tips" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormInput
            label="Published Date"
            name="publishedAt"
            type="date"
            value={formData.publishedAt}
            onChange={handleChange}
            required
            error={errors.publishedAt}
          />
          <FormInput
            label="Read Time"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            required
            error={errors.readTime}
            placeholder="e.g., '5 min read'"
          />
        </div>

        <FormInput
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          error={errors.tags}
          description="Comma-separated tags (e.g., 'react, javascript, web')"
        />

        <div className="border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Author Information
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FormInput
              label="Author Name"
              name="author.name"
              value={formData.author.name}
              onChange={handleChange}
              required
              error={errors["author.name"]}
            />
            <FormInput
              label="Author Role"
              name="author.role"
              value={formData.author.role}
              onChange={handleChange}
              required
              error={errors["author.role"]}
            />
            <FormInput
              label="Author Image URL"
              name="author.image"
              value={formData.author.image}
              onChange={handleChange}
              required
              error={errors["author.image"]}
            />
          </div>
        </div>

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
            {loading ? "Updating..." : "Update Blog Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
