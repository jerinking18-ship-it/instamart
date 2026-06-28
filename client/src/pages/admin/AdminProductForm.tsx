import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categoriesData, dummyProducts } from "../../assets";
import { ArrowLeftIcon } from "lucide-react";
import Loading from "../../components/Loading";

const AdminProductForm: React.FC = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(isEdit);
  const [saving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    unit: "",
    stock: "",
    isOrganic: false,
  });
  useEffect(() => {
    const FetchData = async () => {
      if (isEdit) {
        setFormData(() => dummyProducts.find((p) => p._id === id) as any);
      }
      setLoading(false);
    };
    FetchData();
  }, [id, isEdit]);

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="bg-lime-50 rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center gap-4">
          <Link
            to="/admin/products"
            className="p-2 bg-lime-200 hover:bg-lime-300 text-lime-900 rounded-md transition-colors"
          >
            <ArrowLeftIcon className="size-5" />
          </Link>
          <h2 className="text-xl font-semibold text-lime-950 ">
            {isEdit ? "Edit Product" : "New Product"}
          </h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 outline-none focus:border-lime-900 focus:ring-1 focus:ring-lime-900 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 outline-none focus:border-lime-900 focus:ring-1 focus:ring-lime-900 bg-white text-zinc-600 "
                >
                  <option value="">Select Category</option>
                  {categoriesData.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.text}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Offer Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  min="0"
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 outline-none focus:border-lime-900 focus:ring-1 focus:ring-lime-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Original Price ($)
                </label>
                <input
                  type="number"
                  required
                  value={formData.originalPrice}
                  min="0"
                  onChange={(e) =>
                    setFormData({ ...formData, originalPrice: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 outline-none focus:border-lime-900 focus:ring-1 focus:ring-lime-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  required
                  value={formData.unit}
                  min="0"
                  onChange={(e) =>
                    setFormData({ ...formData, unit: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 outline-none focus:border-lime-900 focus:ring-1 focus:ring-lime-900 bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Stock
                </label>
                <input
                  type="text"
                  required
                  value={formData.stock}
                  min="0"
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 outline-none focus:border-lime-900 focus:ring-1 focus:ring-lime-900 bg-white"
                />
              </div>
              <div className="md:col-span-2 ">
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Product Image
                </label>
                <div className="flex items-center gap-4">
                  {(imageFile || formData.image) && (
                    <div className="size-16 rounded-mb border border-zinc-200 overflow-hidden shrink-0 ">
                      <img
                        src={
                          imageFile
                            ? URL.createObjectURL(imageFile)
                            : formData.image
                        }
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="w-full px-4 py-2.5 rounded-md border border-zinc-200 focus:border-lime-900 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer text-zinc-600 bg-white"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-lime-950 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-md border border-zinc-200 focus:border-lime-900 focus:ring-1 focus:ring-app-green outline-none transition-all resize-none bg-white"
                />
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="isOrganic"
                  className="text-sm font-medium text-lime-900 cursor-pointer"
                >
                  Organic
                </label>
                <input
                  type="checkbox"
                  id="isOrganic"
                  checked={formData.isOrganic}
                  onChange={(e) =>
                    setFormData({ ...formData, isOrganic: e.target.checked })
                  }
                  className="size-5 text-lime-900 rounded border-zinc-200 focus:ring-lime-900 cursor-pointer bg-white"
                />
              </div>
            </div>
            <div className="pt-6 border-t border-zinc-200 flex justify-end">
              <button
                disabled={saving}
                type="submit"
                className="px-6 py-2.5 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Product"}
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default AdminProductForm;
