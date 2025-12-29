'use client';

import { useState, useEffect, useRef } from 'react';
import { FormField, FormInput, FormTextarea } from '@/components/admin/FormField';
import { useToast } from '@/components/admin/Toast';
import { Save, Mail, Phone, MapPin, Eye, EyeOff } from 'lucide-react';
import { content as defaultContent } from '@/config/content';

interface ContactInfo {
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
}

interface ContactVisibility {
  email: boolean;
  phone: boolean;
  address: boolean;
}

interface ContentData {
  contact?: {
    info?: ContactInfo;
    visibility?: ContactVisibility;
  };
}

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast, ToastContainer } = useToast();
  const hasFetchedRef = useRef(false);

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: '',
    phone: '',
    phoneDisplay: '',
    address: '',
  });

  const [visibility, setVisibility] = useState<ContactVisibility>({
    email: true,
    phone: true,
    address: true,
  });

  const fetchContent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const response = await fetch('/api/content', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success && data.data) {
        const content = data.data as ContentData;
        
        // Load contact info if it exists
        if (content.contact?.info) {
          setContactInfo({
            email: content.contact.info.email || '',
            phone: content.contact.info.phone || '',
            phoneDisplay: content.contact.info.phoneDisplay || '',
            address: content.contact.info.address || '',
          });
        }

        // Load visibility settings if they exist
        if (content.contact?.visibility) {
          setVisibility({
            email: content.contact.visibility.email !== false,
            phone: content.contact.visibility.phone !== false,
            address: content.contact.visibility.address !== false,
          });
        }
      } else {
        // If no content exists, use defaults from config
        setContactInfo({
          email: 'support@trust2switch.com',
          phone: '0000000000',
          phoneDisplay: '+1 (000) 000-0000',
          address: '123 Education Street, Learning City, LC 12345',
        });
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      showToast('Failed to load contact information', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchContent();
    }
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem('admin_token');

      // First, fetch existing content to preserve other fields
      const getResponse = await fetch('/api/content', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const getData = await getResponse.json();
      
      // If no content exists, use default content structure
      let existingContent = getData.success && getData.data 
        ? getData.data 
        : {
            site: defaultContent.site,
            navigation: defaultContent.navigation,
            home: defaultContent.home,
            courses: defaultContent.courses,
            about: defaultContent.about,
            blog: defaultContent.blog,
            shop: defaultContent.shop,
            contact: defaultContent.contact,
          };

      // Remove database-specific fields that aren't part of the schema
      const { _id, id, createdAt, updatedAt, ...contentWithoutDbFields } = existingContent as any;

      // Update only the contact section
      const updatedContent = {
        ...contentWithoutDbFields,
        contact: {
          ...(contentWithoutDbFields.contact || {}),
          info: contactInfo,
          visibility: visibility,
        },
      };

      // Save the updated content
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedContent),
      });

      const data = await response.json();

      if (data.success) {
        showToast('Contact information saved successfully', 'success');
      } else {
        showToast(data.message || 'Failed to save contact information', 'error');
      }
    } catch (error) {
      console.error('Error saving contact info:', error);
      showToast('An error occurred while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  const toggleVisibility = (field: keyof ContactVisibility) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-500">Loading settings...</div>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer />
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
            <p className="text-sm text-gray-600 mt-1">
              Manage your contact details and control what appears on the website
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Email Field */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Email Address</label>
              </div>
              <button
                type="button"
                onClick={() => toggleVisibility('email')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  visibility.email
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {visibility.email ? (
                  <>
                    <Eye className="w-4 h-4" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hidden
                  </>
                )}
              </button>
            </div>
            <FormInput
              label=""
              name="email"
              type="email"
              value={contactInfo.email}
              onChange={(e) =>
                setContactInfo((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="support@trust2switch.com"
              className="mt-2"
            />
          </div>

          {/* Phone Field */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
              </div>
              <button
                type="button"
                onClick={() => toggleVisibility('phone')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  visibility.phone
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {visibility.phone ? (
                  <>
                    <Eye className="w-4 h-4" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hidden
                  </>
                )}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <FormInput
                label="Phone (for links)"
                name="phone"
                type="tel"
                value={contactInfo.phone}
                onChange={(e) =>
                  setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="0000000000"
                description="Used for tel: links (numbers only recommended)"
              />
              <FormInput
                label="Phone Display"
                name="phoneDisplay"
                type="text"
                value={contactInfo.phoneDisplay}
                onChange={(e) =>
                  setContactInfo((prev) => ({ ...prev, phoneDisplay: e.target.value }))
                }
                placeholder="+1 (000) 000-0000"
                description="How the phone number appears on the website"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">Address</label>
              </div>
              <button
                type="button"
                onClick={() => toggleVisibility('address')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  visibility.address
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {visibility.address ? (
                  <>
                    <Eye className="w-4 h-4" />
                    Visible
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hidden
                  </>
                )}
              </button>
            </div>
            <FormTextarea
              label=""
              name="address"
              value={contactInfo.address}
              onChange={(e) =>
                setContactInfo((prev) => ({ ...prev, address: e.target.value }))
              }
              placeholder="123 Education Street, Learning City, LC 12345"
              rows={3}
              className="mt-2"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Other Settings Info */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Resources</h2>
        <div className="space-y-2 text-sm text-gray-600">
          <p className="mb-4">
            Manage site-wide content, navigation, and text content via the API endpoint:
          </p>
          <div className="bg-gray-50 p-3 rounded-md">
            <code className="text-sm">/api/content</code>
          </div>
          <ul className="mt-4 space-y-2">
            <li>
              • Professional Courses: <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/professional-courses</code>
            </li>
            <li>
              • School Subjects: <code className="bg-gray-100 px-2 py-1 rounded text-xs">/api/school-subjects</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
