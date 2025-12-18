'use client';

// Admin products management page
import { useEffect, useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/admin/SearchBar';
import { ConfirmDeleteModal } from '@/components/admin/ConfirmDeleteModal';
import { useToast } from '@/components/admin/Toast';
import { Edit2, Trash2, Plus, RefreshCw } from 'lucide-react';

interface Product {
  _id: string;
  sku: string;
  title: string;
  category: string;
  price: number;
  inStock: boolean;
  description?: string;
  rating?: number;
  reviews?: number;
  stockQuantity?: number;
  isPopular?: boolean;
  isFeatured?: boolean;
  originalPrice?: number;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [stockFilter, setStockFilter] = useState('All');
  const { showToast, ToastContainer } = useToast();
  const hasFetchedRef = useRef(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('admin_token');
      const allProducts: Product[] = [];
      let skip = 0;
      const limit = 500;
      let hasMore = true;

      // Fetch all items in batches
      while (hasMore) {
        const response = await fetch(`/api/products?limit=${limit}&skip=${skip}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        
        if (data.success) {
          const products = data.data || [];
          allProducts.push(...products);
          
          // Check if we got all items
          if (products.length < limit || allProducts.length >= (data.total || 0)) {
            hasMore = false;
          } else {
            skip += limit;
          }
        } else {
          showToast('Failed to fetch products', 'error');
          hasMore = false;
        }
      }

      setProducts(allProducts);
    } catch (error) {
      showToast('An error occurred while fetching products', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch products only once on mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchProducts();
    }
  }, []);

  // Filter products using useMemo for performance
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.sku.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          (product.description && product.description.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Apply stock filter
    if (stockFilter === 'In Stock') {
      filtered = filtered.filter((product) => product.inStock);
    } else if (stockFilter === 'Out of Stock') {
      filtered = filtered.filter((product) => !product.inStock);
    }

    return filtered;
  }, [products, searchQuery, categoryFilter, stockFilter]);

  // Memoize categories to prevent recalculation
  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(products.map((p) => p.category)))];
  }, [products]);

  const handleDelete = async () => {
    if (!deleteModal.product) return;

    setDeleting(true);
    try {
      const token = localStorage.getItem('admin_token');
      const response = await fetch(`/api/products/${deleteModal.product._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        showToast('Product deleted successfully', 'success');
        // Remove the deleted product from state instead of refetching
        setProducts((prev) => prev.filter((p) => p._id !== deleteModal.product!._id));
        setDeleteModal({ isOpen: false, product: null });
      } else {
        showToast(data.message || 'Failed to delete product', 'error');
      }
    } catch (error) {
      showToast('An error occurred while deleting the product', 'error');
    } finally {
      setDeleting(false);
    }
  };

  if (loading && products.length === 0) {
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
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your products ({filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'})
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/admin/products/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Product
          </Link>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search products by title, SKU, or category..."
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
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="All">All Stock Status</option>
            <option value="In Stock">In Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery || categoryFilter !== 'All' || stockFilter !== 'All'
                ? 'No products match your filters.'
                : 'No products found. Create your first product!'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock / Rating
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                        <div className="flex gap-2 mt-1">
                          {product.isPopular && (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Popular
                            </span>
                          )}
                          {product.isFeatured && (
                            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{product.price.toLocaleString()}</div>
                      {product.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            product.inStock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                        {product.stockQuantity !== undefined && (
                          <span className="text-sm text-gray-500">({product.stockQuantity})</span>
                        )}
                      </div>
                      {product.rating !== undefined && (
                        <div className="text-sm text-gray-500 mt-1">
                          ⭐ {product.rating} {product.reviews ? `(${product.reviews})` : ''}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/products/${product._id}`}
                          className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                        >
                          <Edit2 className="w-4 h-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => setDeleteModal({ isOpen: true, product })}
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
        onClose={() => setDeleteModal({ isOpen: false, product: null })}
        onConfirm={handleDelete}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        itemName={deleteModal.product?.title}
        loading={deleting}
      />
    </div>
  );
}


