"use client";

// Admin users management page
import { useEffect, useState, useMemo, useRef } from "react";
import { SearchBar } from "@/components/admin/SearchBar";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { useToast } from "@/components/admin/Toast";
import { FormInput, FormSelect } from "@/components/admin/FormField";
import { Modal } from "@/components/ui/Modal";
import { RefreshCw, Plus, Edit2, Trash2, UserPlus } from "lucide-react";
import type { Permission, Resource, Action } from "@/lib/auth/permissions";
import { DEFAULT_PERMISSIONS } from "@/lib/auth/permissions";

interface AdminUser {
  _id: string;
  username: string;
  email: string;
  role: "admin" | "editor" | "custom";
  permissions?: Permission[];
  isActive: boolean;
  createdAt: string;
}

const RESOURCES: Resource[] = [
  "courses",
  "blog",
  "products",
  "callbackRequests",
  "users",
  "settings",
];

const ACTIONS: Action[] = ["view", "create", "edit", "delete"];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    user: AdminUser | null;
  }>({
    isOpen: false,
    user: null,
  });
  const [editModal, setEditModal] = useState<{
    isOpen: boolean;
    user: AdminUser | null;
  }>({
    isOpen: false,
    user: null,
  });
  const [createModal, setCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { showToast, ToastContainer } = useToast();
  const hasFetchedRef = useRef(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "custom" as "admin" | "editor" | "custom",
    permissions: [] as Permission[],
    isActive: true,
  });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/users?limit=500&skip=0", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data || []);
      } else {
        showToast("Failed to fetch users", "error");
      }
    } catch (error) {
      showToast("An error occurred while fetching users", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchUsers();
    }
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = users;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [users, searchQuery]);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        showToast("User created successfully", "success");
        setCreateModal(false);
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "custom",
          permissions: [],
          isActive: true,
        });
        fetchUsers();
      } else {
        showToast(data.message || "Failed to create user", "error");
      }
    } catch (error) {
      showToast("An error occurred while creating user", "error");
    }
  };

  const handleUpdate = async () => {
    if (!editModal.user) return;

    try {
      const token = localStorage.getItem("admin_token");
      const updateData = { ...formData } as Omit<typeof formData, 'password'> & { password?: string };
      if (!updateData.password) {
        delete updateData.password;
      }

      const response = await fetch(`/api/users/${editModal.user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        showToast("User updated successfully", "success");
        setEditModal({ isOpen: false, user: null });
        setFormData({
          username: "",
          email: "",
          password: "",
          role: "custom",
          permissions: [],
          isActive: true,
        });
        fetchUsers();
      } else {
        showToast(data.message || "Failed to update user", "error");
      }
    } catch (error) {
      showToast("An error occurred while updating user", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.user) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/users/${deleteModal.user._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        showToast("User deleted successfully", "success");
        setUsers((prev) => prev.filter((u) => u._id !== deleteModal.user!._id));
        setDeleteModal({ isOpen: false, user: null });
      } else {
        showToast(data.message || "Failed to delete user", "error");
      }
    } catch (error) {
      showToast("An error occurred while deleting user", "error");
    } finally {
      setDeleting(false);
    }
  };

  const openEditModal = (user: AdminUser) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      role: user.role,
      permissions: user.permissions || [],
      isActive: user.isActive,
    });
    setEditModal({ isOpen: true, user });
  };

  const openCreateModal = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      role: "custom",
      permissions: [],
      isActive: true,
    });
    setCreateModal(true);
  };

  const togglePermission = (
    resource: Resource,
    action: Action,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const permissions = [...(prev.permissions || [])];
      const resourceIndex = permissions.findIndex(
        (p) => p.resource === resource
      );

      if (checked) {
        if (resourceIndex >= 0) {
          if (!permissions[resourceIndex].actions.includes(action)) {
            permissions[resourceIndex].actions.push(action);
          }
        } else {
          permissions.push({ resource, actions: [action] });
        }
      } else {
        if (resourceIndex >= 0) {
          permissions[resourceIndex].actions = permissions[
            resourceIndex
          ].actions.filter((a) => a !== action);
          // Remove resource if no actions left
          if (permissions[resourceIndex].actions.length === 0) {
            permissions.splice(resourceIndex, 1);
          }
        }
      }

      return { ...prev, permissions };
    });
  };

  const hasPermission = (resource: Resource, action: Action): boolean => {
    const perm = formData.permissions.find((p) => p.resource === resource);
    return perm ? perm.actions.includes(action) : false;
  };

  const applyRolePermissions = (role: "admin" | "editor" | "custom") => {
    if (role === "custom") {
      return;
    }
    setFormData((prev) => ({
      ...prev,
      role,
      permissions: DEFAULT_PERMISSIONS[role] || [],
    }));
  };

  if (loading && users.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage admin users and permissions ({filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"})
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users by username or email..."
        />
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery
                ? "No users match your search."
                : "No users found. Create your first user!"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.username}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <button
                          onClick={() => openEditModal(user)}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, user })
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

      {/* Create User Modal */}
      <Modal
        isOpen={createModal}
        onClose={() => setCreateModal(false)}
        title="Create New User"
        size="lg"
      >
        <div className="space-y-4">
          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
          <FormSelect
            label="Role"
            name="role"
            value={formData.role}
            onChange={(e) => {
              const role = e.target.value as "admin" | "editor" | "custom";
              applyRolePermissions(role);
            }}
            options={[
              { value: "admin", label: "Admin (Full Access)" },
              { value: "editor", label: "Editor (Limited Access)" },
              { value: "custom", label: "Custom (Set Permissions)" },
            ]}
          />

          {formData.role === "custom" && (
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Permissions
              </label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {RESOURCES.map((resource) => (
                  <div key={resource} className="border rounded p-3">
                    <div className="font-medium text-sm text-gray-900 mb-2 capitalize">
                      {resource}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {ACTIONS.map((action) => (
                        <label
                          key={action}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={hasPermission(resource, action)}
                            onChange={(e) =>
                              togglePermission(
                                resource,
                                action,
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-gray-700 capitalize">
                            {action}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setCreateModal(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Create User
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, user: null })}
        title="Edit User"
        size="lg"
      >
        <div className="space-y-4">
          <FormInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, username: e.target.value }))
            }
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
          <FormInput
            label="Password (leave blank to keep current)"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, password: e.target.value }))
            }
          />
          <FormSelect
            label="Role"
            name="role"
            value={formData.role}
            onChange={(e) => {
              const role = e.target.value as "admin" | "editor" | "custom";
              applyRolePermissions(role);
            }}
            options={[
              { value: "admin", label: "Admin (Full Access)" },
              { value: "editor", label: "Editor (Limited Access)" },
              { value: "custom", label: "Custom (Set Permissions)" },
            ]}
          />

          {formData.role === "custom" && (
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Permissions
              </label>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {RESOURCES.map((resource) => (
                  <div key={resource} className="border rounded p-3">
                    <div className="font-medium text-sm text-gray-900 mb-2 capitalize">
                      {resource}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {ACTIONS.map((action) => (
                        <label
                          key={action}
                          className="flex items-center text-sm"
                        >
                          <input
                            type="checkbox"
                            checked={hasPermission(resource, action)}
                            onChange={(e) =>
                              togglePermission(
                                resource,
                                action,
                                e.target.checked
                              )
                            }
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-2 text-gray-700 capitalize">
                            {action}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, isActive: e.target.checked }))
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-700">Active</span>
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={() => setEditModal({ isOpen: false, user: null })}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
            >
              Update User
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, user: null })}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        itemName={deleteModal.user?.username}
        loading={deleting}
      />
    </div>
  );
}
