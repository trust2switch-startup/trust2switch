'use client';

// Admin settings page
export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Content Configuration</h2>
          <p className="text-gray-600 mb-4">
            Manage site-wide content, navigation, and text content.
          </p>
          <p className="text-sm text-gray-500">
            API endpoint: <code className="bg-gray-100 px-2 py-1 rounded">/api/content</code>
          </p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Resources</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              • Professional Courses: <code className="bg-gray-100 px-2 py-1 rounded">/api/professional-courses</code>
            </li>
            <li>
              • School Subjects: <code className="bg-gray-100 px-2 py-1 rounded">/api/school-subjects</code>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Settings can be managed via API calls. Use the API endpoints above
          with PUT requests to update configurations. A full admin UI for these settings can be
          added in the future.
        </p>
      </div>
    </div>
  );
}

