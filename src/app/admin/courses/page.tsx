"use client";

// Admin courses management page
import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/admin/SearchBar";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { useToast } from "@/components/admin/Toast";
import { Edit2, Trash2, Plus, RefreshCw, Copy, Eye, EyeOff } from "lucide-react";

interface Course {
  _id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  price: number;
  rating: number;
  description?: string;
  students?: number;
  reviews?: number;
  isVisible: boolean;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [duplicating, setDuplicating] = useState<string | null>(null);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    course: Course | null;
  }>({
    isOpen: false,
    course: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [levelFilter, setLevelFilter] = useState("All");
  const { showToast, ToastContainer } = useToast();
  const hasFetchedRef = useRef(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const allCourses: Course[] = [];
      let skip = 0;
      const limit = 500;
      let hasMore = true;

      // Fetch all items in batches
      while (hasMore) {
        const response = await fetch(`/api/courses?limit=${limit}&skip=${skip}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (data.success) {
          const courses = data.data || [];
          allCourses.push(...courses);

          // Check if we got all items
          if (courses.length < limit || allCourses.length >= (data.total || 0)) {
            hasMore = false;
          } else {
            skip += limit;
          }
        } else {
          showToast("Failed to fetch courses", "error");
          hasMore = false;
        }
      }

      setCourses(allCourses);
    } catch (error) {
      showToast("An error occurred while fetching courses", "error");
    } finally {
      setLoading(false);
      setDuplicating(null);
    }
  };

  // Fetch courses only once on mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchCourses();
    }
  }, []);

  // Filter courses using useMemo for performance
  const filteredCourses = useMemo(() => {
    let filtered = courses;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(query) ||
          course.slug.toLowerCase().includes(query) ||
          course.category.toLowerCase().includes(query) ||
          (course.description &&
            course.description.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter(
        (course) => course.category === categoryFilter
      );
    }

    // Apply level filter
    if (levelFilter !== "All") {
      filtered = filtered.filter((course) => course.level === levelFilter);
    }

    return filtered;
  }, [courses, searchQuery, categoryFilter, levelFilter]);

  // Memoize categories and levels to prevent recalculation
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(courses.map((c) => c.category)))];
  }, [courses]);

  const levels = useMemo(() => {
    return ["All", ...Array.from(new Set(courses.map((c) => c.level)))];
  }, [courses]);

  const handleDuplicate = async (courseId: string) => {
    setDuplicating(courseId);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/courses/${courseId}/clone`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (data.success) {
        showToast("Course duplicated successfully", "success");
        // Refetch courses to show the new one
        fetchCourses();
      } else {
        showToast(data.message || "Failed to duplicate course", "error");
        setDuplicating(null);
      }
    } catch (error) {
      showToast("An error occurred while duplicating the course", "error");
      setDuplicating(null);
    }
  };

  const handleToggleVisibility = async (course: Course) => {
    try {
      const token = localStorage.getItem("admin_token");
      const newVisibility = !course.isVisible;

      // Optimistic update
      setCourses(prev => prev.map(c =>
        c._id === course._id ? { ...c, isVisible: newVisibility } : c
      ));

      const response = await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isVisible: newVisibility }),
      });

      const data = await response.json();

      if (data.success) {
        showToast(`Course ${newVisibility ? 'enabled' : 'disabled'} successfully`, "success");
      } else {
        // Revert on failure
        setCourses(prev => prev.map(c =>
          c._id === course._id ? { ...c, isVisible: course.isVisible } : c
        ));
        showToast(data.message || "Failed to update course visibility", "error");
      }
    } catch (error) {
      // Revert on failure
      setCourses(prev => prev.map(c =>
        c._id === course._id ? { ...c, isVisible: course.isVisible } : c
      ));
      showToast("An error occurred while updating visibility", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.course) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/courses/${deleteModal.course._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        showToast("Course deleted successfully", "success");
        // Remove the deleted course from state instead of refetching
        setCourses((prev) =>
          prev.filter((c) => c._id !== deleteModal.course!._id)
        );
        setDeleteModal({ isOpen: false, course: null });
      } else {
        showToast(data.message || "Failed to delete course", "error");
      }
    } catch (error) {
      showToast("An error occurred while deleting the course", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading && courses.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your courses ({filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"})
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchCourses}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <Link
            href="/admin/courses/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Course
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses by title, slug, or category..."
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {levels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery || categoryFilter !== "All" || levelFilter !== "All"
                ? "No courses match your filters."
                : "No courses found. Create your first course!"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category / Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating / Students
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Visibility
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCourses.map((course) => (
                  <tr key={course._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {course.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {course.slug}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col gap-1">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800 w-fit">
                          {course.category}
                        </span>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 w-fit">
                          {course.level}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ₹{course.price.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ⭐ {course.rating}{" "}
                        {course.reviews ? `(${course.reviews} reviews)` : ""}
                      </div>
                      {course.students !== undefined && (
                        <div className="text-sm text-gray-500">
                          {course.students} students
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleVisibility(course)}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${course.isVisible
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        title={course.isVisible ? "Click to hide" : "Click to show"}
                      >
                        {course.isVisible ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Enabled
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Disabled
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/courses/${course._id}`}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDuplicate(course._id)}
                          disabled={duplicating === course._id}
                          className="text-blue-600 hover:text-blue-900 inline-flex items-center disabled:opacity-50"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          {duplicating === course._id ? "Copying..." : "Duplicate"}
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, course })
                          }
                          className="text-red-600 hover:text-red-900 inline-flex items-center"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, course: null })}
        onConfirm={handleDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        itemName={deleteModal.course?.title}
        loading={deleting}
      />
    </div>
  );
}
