'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput, FormTextarea, FormSelect } from '@/components/admin/FormField';
import { useToast } from '@/components/admin/Toast';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast, ToastContainer } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    sku: '',
    title: '',
    description: '',
    longDescription: '',
    image: '',
    category: '',
    price: 0,
    originalPrice: undefined as number | undefined,
    currency: 'INR',
    inStock: true,
    stockQuantity: undefined as number | undefined,
    rating: undefined as number | undefined,
    reviews: undefined as number | undefined,
    tags: '',
    features: '',
    fileFormat: '',
    fileSize: '',
    deliveryMethod: '',
    isPopular: false,
    isNewProduct: false,
    isFeatured: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === 'number') {
      const numValue = value === '' ? undefined : parseFloat(value);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const token = localStorage.getItem('admin_token');

      // Parse arrays from comma-separated strings
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const featuresArray = formData.features
        .split('\n')
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      const payload = {
        ...formData,
        tags: tagsArray,
        features: featuresArray.length > 0 ? featuresArray : undefined,
        originalPrice: formData.originalPrice || undefined,
        stockQuantity: formData.stockQuantity || undefined,
        rating: formData.rating || undefined,
        reviews: formData.reviews || undefined,
        fileFormat: formData.fileFormat || undefined,
        fileSize: formData.fileSize || undefined,
        deliveryMethod: formData.deliveryMethod || undefined,
        longDescription: formData.longDescription || undefined,
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        showToast('Product created successfully!', 'success');
        setTimeout(() => {
          router.push('/admin/products');
        }, 1000);
      } else {
        showToast(data.message || 'Failed to create product', 'error');
        if (data.errors) {
          setErrors(data.errors);
        }
      }
    } catch (error) {
      showToast('An error occurred. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p className="mt-1 text-sm text-gray-500">Fill in the details to create a new product</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormInput
            label="SKU"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            required
            error={errors.sku}
            description="Unique product identifier"
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
          error={errors.longDescription}
          rows={5}
          description="Optional detailed description"
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
          <FormSelect
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            options={[
              { value: 'INR', label: 'INR (₹)' },
              { value: 'USD', label: 'USD ($)' },
              { value: 'EUR', label: 'EUR (€)' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormInput
            label="Rating"
            name="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={formData.rating || ''}
            onChange={handleChange}
            error={errors.rating}
            description="Optional (0-5)"
          />
          <FormInput
            label="Reviews"
            name="reviews"
            type="number"
            value={formData.reviews || ''}
            onChange={handleChange}
            error={errors.reviews}
            description="Optional"
          />
          <FormInput
            label="Stock Quantity"
            name="stockQuantity"
            type="number"
            value={formData.stockQuantity || ''}
            onChange={handleChange}
            error={errors.stockQuantity}
            description="Optional"
          />
        </div>

        <div className="flex items-center">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="inStock"
              checked={formData.inStock}
              onChange={handleChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock</span>
          </label>
        </div>

        <FormTextarea
          label="Features"
          name="features"
          value={formData.features}
          onChange={handleChange}
          error={errors.features}
          rows={4}
          description="One feature per line (optional)"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FormInput
            label="File Format"
            name="fileFormat"
            value={formData.fileFormat}
            onChange={handleChange}
            error={errors.fileFormat}
            description="Optional (e.g., PDF, ZIP)"
          />
          <FormInput
            label="File Size"
            name="fileSize"
            value={formData.fileSize}
            onChange={handleChange}
            error={errors.fileSize}
            description="Optional (e.g., '10 MB')"
          />
          <FormInput
            label="Delivery Method"
            name="deliveryMethod"
            value={formData.deliveryMethod}
            onChange={handleChange}
            error={errors.deliveryMethod}
            description="Optional (e.g., 'Digital Download')"
          />
        </div>

        <FormInput
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          error={errors.tags}
          description="Comma-separated tags (optional)"
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
              name="isNewProduct"
              checked={formData.isNewProduct}
              onChange={handleChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Mark as New</span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-700">Mark as Featured</span>
          </label>
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
            {loading ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
