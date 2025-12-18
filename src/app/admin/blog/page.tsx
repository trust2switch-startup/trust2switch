"use client";

// Admin blog management page
import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/admin/SearchBar";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { useToast } from "@/components/admin/Toast";
import { Edit2, Trash2, Plus, RefreshCw } from "lucide-react";

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  excerpt?: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    post: BlogPost | null;
  }>({
    isOpen: false,
    post: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const { showToast, ToastContainer } = useToast();
  const hasFetchedRef = useRef(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const allPosts: BlogPost[] = [];
      let skip = 0;
      const limit = 500;
      let hasMore = true;

      // Fetch all items in batches
      while (hasMore) {
        const response = await fetch(`/api/blog?limit=${limit}&skip=${skip}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.success) {
          const posts = data.data || [];
          allPosts.push(...posts);
          
          // Check if we got all items
          if (posts.length < limit || allPosts.length >= (data.total || 0)) {
            hasMore = false;
          } else {
            skip += limit;
          }
        } else {
          showToast("Failed to fetch blog posts", "error");
          hasMore = false;
        }
      }

      setPosts(allPosts);
    } catch (error) {
      showToast("An error occurred while fetching blog posts", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts only once on mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchPosts();
    }
  }, []);

  // Filter posts using useMemo for performance
  const filteredPosts = useMemo(() => {
    let filtered = posts;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.slug.toLowerCase().includes(query) ||
          post.category.toLowerCase().includes(query) ||
          (post.excerpt && post.excerpt.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (categoryFilter !== "All") {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    return filtered;
  }, [posts, searchQuery, categoryFilter]);

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
  }, [posts]);

  const handleDelete = async () => {
    if (!deleteModal.post) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/blog/${deleteModal.post._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        showToast("Blog post deleted successfully", "success");
        // Remove the deleted post from state instead of refetching
        setPosts((prev) => prev.filter((p) => p._id !== deleteModal.post!._id));
        setDeleteModal({ isOpen: false, post: null });
      } else {
        showToast(data.message || "Failed to delete blog post", "error");
      }
    } catch (error) {
      showToast("An error occurred while deleting the blog post", "error");
    } finally {
      setDeleting(false);
    }
  };

  if (loading && posts.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your blog posts ({filteredPosts.length}{" "}
            {filteredPosts.length === 1 ? "post" : "posts"})
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchPosts}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Post
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search posts by title, slug, or category..."
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
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery || categoryFilter !== "All"
                ? "No posts match your filters."
                : "No blog posts found. Create your first post!"}
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
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Published
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {post.title}
                        </div>
                        <div className="text-sm text-gray-500">{post.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/blog/${post._id}`}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, post })}
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
        onClose={() => setDeleteModal({ isOpen: false, post: null })}
        onConfirm={handleDelete}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        itemName={deleteModal.post?.title}
        loading={deleting}
      />
    </div>
  );
}
