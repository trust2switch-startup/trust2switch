'use client';

// Admin blog management page
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/blog', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setPosts(data.data);
      } else {
        setError('Failed to fetch blog posts');
      }
    } catch (error) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        fetchPosts();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (error) {
      alert('An error occurred');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {posts.map((post) => (
            <li key={post._id}>
              <div className="px-4 py-4 sm:px-6 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {post.title}
                    </p>
                    <span className="ml-2 text-xs text-gray-500">({post.slug})</span>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {post.category}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Published: {post.publishedAt}</p>
                    </div>
                  </div>
                </div>
                <div className="ml-4 flex space-x-2">
                  <Link
                    href={`/admin/blog/${post._id}`}
                    className="text-indigo-600 hover:text-indigo-900 text-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {posts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No blog posts found. Create your first post!
        </div>
      )}
    </div>
  );
}

