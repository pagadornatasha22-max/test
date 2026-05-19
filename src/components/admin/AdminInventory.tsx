import React, { useState } from 'react';
import { Product, Category } from '../../types';
import { Search, Plus, Edit, Trash2, CheckCircle2, XCircle, Sparkles, X, Save } from 'lucide-react';
import { compressImage } from '../../utils/image';

interface AdminInventoryProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  addToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const AdminInventory: React.FC<AdminInventoryProps> = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  addToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [modalMode, setModalMode] = useState<'add' | 'edit' | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('bouquets');
  const [price, setPrice] = useState(1000);
  const [image, setImage] = useState('');
  const [imageUploadMethod, setImageUploadMethod] = useState<'url' | 'file'>('url');
  const [description, setDescription] = useState('');
  const [isAvailable, setIsAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const openAddModal = () => {
    setName('');
    setCategory('bouquets');
    setPrice(1200);
    setImage('https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800');
    setDescription('');
    setIsAvailable(true);
    setFeatured(false);
    setModalMode('add');
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price);
    setImage(p.image);
    setImageUploadMethod(p.image.startsWith('data:') ? 'file' : 'url');
    setDescription(p.description);
    setIsAvailable(p.isAvailable);
    setFeatured(!!p.featured);
    setModalMode('edit');
  };

  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressImage(file, 600, 0.6)
        .then((compressedBase64) => {
          setImage(compressedBase64);
          addToast('success', `Image "${file.name}" uploaded successfully!`);
        })
        .catch((err) => {
          console.error("Compression error:", err);
          addToast('error', 'Failed to compress or upload image. Please try again.');
        });
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !image.trim() || !price || price <= 0) {
      addToast('error', 'Please provide a valid name, price, and image URL.');
      return;
    }

    if (modalMode === 'add') {
      onAddProduct({
        name: name.trim(),
        category,
        price,
        image: image.trim(),
        description: description.trim() || 'Beautiful flower arrangement hand-crafted by Macel.',
        rating: 5.0,
        isAvailable,
        featured,
      });
      addToast('success', `${name} successfully added to store inventory!`);
    } else if (modalMode === 'edit' && editingProduct) {
      onEditProduct({
        ...editingProduct,
        name: name.trim(),
        category,
        price,
        image: image.trim(),
        description: description.trim(),
        isAvailable,
        featured,
      });
      addToast('success', `${name} successfully updated!`);
    }

    setModalMode(null);
  };

  const toggleAvailabilityFast = (p: Product) => {
    onEditProduct({
      ...p,
      isAvailable: !p.isAvailable,
    });
    addToast('info', `${p.name} marked as ${!p.isAvailable ? 'Available' : 'Out of Stock'}`);
  };

  const handleDelete = (p: Product) => {
    if (window.confirm(`Are you sure you want to remove "${p.name}" from inventory?`)) {
      onDeleteProduct(p.id);
      addToast('info', `${p.name} removed from inventory.`);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h2 className="text-3xl font-serif font-bold text-stone-900">Flower Inventory Management</h2>
          <p className="text-xs text-stone-500 mt-1">Add, update prices, or remove flower products</p>
        </div>
        <button
          onClick={openAddModal}
          className="px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition-all flex items-center space-x-2 text-sm cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Flower Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-xs border border-stone-200/80">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider px-2 hidden sm:inline">
            Category:
          </span>
          {(['all', 'bouquets', 'dozen', 'customized'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat ? 'bg-rose-600 text-white shadow-md shadow-rose-200' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' && '🌸 All'}
              {cat === 'bouquets' && '💐 Bouquets'}
              {cat === 'dozen' && '🌹 Dozen Flowers'}
              {cat === 'customized' && '✨ Customized'}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search flower inventory..."
            className="w-full pl-9 pr-4 py-2 bg-stone-100/80 border border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-rose-500 transition-all placeholder:text-stone-400"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className={`bg-white rounded-3xl border transition-all duration-300 flex flex-col overflow-hidden shadow-xs ${
              prod.isAvailable ? 'border-stone-200 hover:border-rose-300' : 'border-stone-200 opacity-75'
            }`}
          >
            <div className="relative aspect-4/3 bg-stone-100">
              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-md text-[10px] font-bold text-stone-800 uppercase tracking-wider">
                  {prod.category}
                </span>
                {prod.featured && (
                  <span className="px-2 py-0.5 rounded-lg bg-amber-500 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => toggleAvailabilityFast(prod)}
                  title="Toggle In/Out of Stock"
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center space-x-1 cursor-pointer ${
                    prod.isAvailable ? 'bg-emerald-600 text-white' : 'bg-rose-700 text-white'
                  }`}
                >
                  {prod.isAvailable ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 inline" /> <span>In Stock</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3.5 h-3.5 inline" /> <span>Out of Stock</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">{prod.name}</h3>
                <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold block">Current Price</span>
                  <span className="text-xl font-extrabold text-stone-900">₱{prod.price.toLocaleString()}</span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={() => openEditModal(prod)}
                    className="p-2 bg-stone-100 hover:bg-rose-50 text-stone-700 hover:text-rose-700 rounded-xl transition-colors cursor-pointer"
                    title="Edit Product"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(prod)}
                    className="p-2 bg-stone-100 hover:bg-rose-50 text-stone-400 hover:text-rose-600 rounded-xl transition-colors cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto relative animate-scale-up border border-stone-100">
            
            <button
              onClick={() => setModalMode(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-serif font-bold text-2xl text-stone-900">
                {modalMode === 'add' ? 'Add New Flower Arrangement' : 'Edit Product Details'}
              </h3>
              <p className="text-xs text-stone-500 mt-1">Ensure correct price & images for Macel's Flower Shop</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dozen Golden Sunflowers"
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as Category)}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500 bg-white cursor-pointer"
                  >
                    <option value="bouquets">Bouquets</option>
                    <option value="dozen">Dozen Flowers</option>
                    <option value="customized">Customized</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                    Price (₱ PHP) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600">
                  Product Image *
                </label>
                
                {/* Upload Method Toggle */}
                <div className="flex items-center space-x-2 bg-stone-50 p-1.5 rounded-xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setImageUploadMethod('url')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      imageUploadMethod === 'url' ? 'bg-white text-rose-700 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    🔗 Paste Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageUploadMethod('file')}
                    className={`flex-1 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      imageUploadMethod === 'file' ? 'bg-white text-rose-700 shadow-xs' : 'text-stone-500'
                    }`}
                  >
                    📁 Upload File
                  </button>
                </div>

                {/* URL Input */}
                {imageUploadMethod === 'url' && (
                  <div className="space-y-1.5">
                    <input
                      type="url"
                      required
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                    />
                    <p className="text-[10px] text-stone-400">Provide a high-quality photo URL from Unsplash, Imgur, or your own CDN.</p>
                  </div>
                )}

                {/* File Upload */}
                {imageUploadMethod === 'file' && (
                  <div className="space-y-1.5">
                    <label className="flex items-center justify-center space-x-2 px-4 py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-sm cursor-pointer transition-colors border border-rose-200">
                      <span>📤 Choose Image File</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-stone-400">Upload from your device (PNG, JPG, WebP). The image will be converted to Base64 and stored.</p>
                  </div>
                )}

                {/* Image Preview */}
                {image && (
                  <div className="mt-2 p-2 bg-stone-50 rounded-xl border border-stone-200">
                    <p className="text-[10px] font-bold text-stone-600 mb-2 uppercase tracking-wider">Preview:</p>
                    <img
                      src={image}
                      alt="Product Preview"
                      className="w-full h-40 object-cover rounded-lg border border-stone-200"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=800';
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setImage('')}
                      className="mt-2 text-[10px] font-bold text-stone-400 hover:text-rose-600 transition-colors"
                    >
                      ✕ Remove Image
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 mb-1">
                  Product Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the flowers, wrapper, ribbons..."
                  className="w-full px-4 py-3 border border-stone-300 rounded-xl font-medium text-sm focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-200">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="avail"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="w-5 h-5 text-rose-600 rounded-md focus:ring-rose-500 cursor-pointer"
                  />
                  <label htmlFor="avail" className="text-sm font-bold text-stone-800 cursor-pointer">
                    Item is Available for Sale
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="feat"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="w-5 h-5 text-amber-500 rounded-md focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="feat" className="text-sm font-bold text-stone-800 cursor-pointer flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 inline" /> Featured
                  </label>
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-5 py-3 text-stone-600 hover:bg-stone-100 rounded-xl font-semibold text-sm transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-lg shadow-rose-200 transition-all flex items-center space-x-2 text-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{modalMode === 'add' ? 'Save New Product' : 'Update Product'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};
