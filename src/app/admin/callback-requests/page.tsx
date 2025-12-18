"use client";

// Admin callback requests management page
import { useEffect, useState, useMemo, useRef } from "react";
import { SearchBar } from "@/components/admin/SearchBar";
import { ConfirmDeleteModal } from "@/components/admin/ConfirmDeleteModal";
import { useToast } from "@/components/admin/Toast";
import { RefreshCw, Phone, Clock, MessageSquare, Trash2 } from "lucide-react";

interface CallbackRequest {
  _id: string;
  name: string;
  phone: string;
  preferredTime: string;
  message?: string;
  status: "pending" | "contacted" | "completed";
  createdAt: string;
  updatedAt: string;
}

export default function AdminCallbackRequestsPage() {
  const [requests, setRequests] = useState<CallbackRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    request: CallbackRequest | null;
  }>({
    isOpen: false,
    request: null,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const { showToast, ToastContainer } = useToast();
  const hasFetchedRef = useRef(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("admin_token");
      const allRequests: CallbackRequest[] = [];
      let skip = 0;
      const limit = 500;
      let hasMore = true;

      // Fetch all items in batches
      while (hasMore) {
        const response = await fetch(
          `/api/callback-requests?limit=${limit}&skip=${skip}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (data.success) {
          const fetchedRequests = data.data || [];
          allRequests.push(...fetchedRequests);

          // Check if we got all items
          if (
            fetchedRequests.length < limit ||
            allRequests.length >= (data.total || 0)
          ) {
            hasMore = false;
          } else {
            skip += limit;
          }
        } else {
          showToast("Failed to fetch callback requests", "error");
          hasMore = false;
        }
      }

      setRequests(allRequests);
    } catch (error) {
      showToast("An error occurred while fetching callback requests", "error");
    } finally {
      setLoading(false);
    }
  };

  // Fetch requests only once on mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchRequests();
    }
  }, []);

  // Filter requests based on search and status
  const filteredRequests = useMemo(() => {
    let filtered = requests;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (request) =>
          request.name.toLowerCase().includes(query) ||
          request.phone.toLowerCase().includes(query) ||
          (request.message &&
            request.message.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (statusFilter !== "All") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }

    return filtered;
  }, [requests, searchQuery, statusFilter]);

  const handleStatusUpdate = async (
    id: string,
    newStatus: "pending" | "contacted" | "completed"
  ) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/callback-requests/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Status updated successfully", "success");
        // Update the request in state
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: newStatus } : req
          )
        );
      } else {
        showToast(data.message || "Failed to update status", "error");
      }
    } catch (error) {
      showToast("An error occurred while updating status", "error");
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteModal.request) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `/api/callback-requests/${deleteModal.request._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        showToast("Callback request deleted successfully", "success");
        // Remove the deleted request from state
        setRequests((prev) =>
          prev.filter((r) => r._id !== deleteModal.request!._id)
        );
        setDeleteModal({ isOpen: false, request: null });
      } else {
        showToast(data.message || "Failed to delete callback request", "error");
      }
    } catch (error) {
      showToast("An error occurred while deleting the callback request", "error");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "contacted":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPreferredTimeLabel = (time: string) => {
    switch (time) {
      case "morning":
        return "Morning";
      case "afternoon":
        return "Afternoon";
      case "evening":
        return "Evening";
      default:
        return time;
    }
  };

  if (loading && requests.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">
            Callback Requests
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage callback requests ({filteredRequests.length}{" "}
            {filteredRequests.length === 1 ? "request" : "requests"})
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchRequests}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, phone, or message..."
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="All">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery || statusFilter !== "All"
                ? "No requests match your filters."
                : "No callback requests found."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name / Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preferred Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {request.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {request.phone}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {getPreferredTimeLabel(request.preferredTime)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {request.message ? (
                          <div className="flex items-start gap-1">
                            <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            <span className="truncate">{request.message}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No message</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={request.status}
                        onChange={(e) =>
                          handleStatusUpdate(
                            request._id,
                            e.target.value as "pending" | "contacted" | "completed"
                          )
                        }
                        disabled={updating === request._id}
                        className={`text-xs font-semibold rounded-full px-3 py-1 border-0 focus:ring-2 focus:ring-indigo-500 ${
                          getStatusColor(request.status)
                        } ${updating === request._id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(request.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() =>
                          setDeleteModal({ isOpen: true, request })
                        }
                        className="text-red-600 hover:text-red-900 inline-flex items-center"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </button>
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
        onClose={() => setDeleteModal({ isOpen: false, request: null })}
        onConfirm={handleDelete}
        title="Delete Callback Request"
        message="Are you sure you want to delete this callback request? This action cannot be undone."
        itemName={deleteModal.request?.name}
        loading={deleting}
      />
    </div>
  );
}
