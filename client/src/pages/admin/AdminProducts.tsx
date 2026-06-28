import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon, EditIcon, XIcon } from "lucide-react";
import type { ProductTypes } from "../../types";
import Loading from "../../components/Loading";
import { dummyProducts } from "../../assets";

function AdminProducts() {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setProducts(dummyProducts);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleMarkOutOfStock = async (id: string, name: string) => {
    if (
      !window.confirm(
        `Are you sure you want to mark "${name}" as out of stock?`,
      )
    )
      return;
    console.log(id);
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="bg-lime-50 rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-200 flex items-center justify-between gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-lime-950">Products</h2>
          <Link
            to="/admin/products/new"
            className="flex items-center gap-2 px-4 py-2 bg-lime-950 text-white rounded-lg hover:bg-lime-600 transition-colors font-medium text-sm"
          >
            <PlusIcon className="size-4" /> Add Product
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-lime-950 text-white uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 ">
              {products.length === 0 ? (
                <div>
                  <tr>
                    <td
                      className="px-6 py-8 text-center text-zinc-500"
                      colSpan={4}
                    >
                      No Products Found
                    </td>
                  </tr>
                </div>
              ) : (
                products.map((product) => (
                  <tr
                    key={product._id}
                    className="hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image[0]}
                          alt={product.name}
                          className="size-12 rounded-md object-cover"
                        />
                        <div>
                          <p className="font semibold text-lime-950">
                            {product.name}
                          </p>

                          <p className="text-xs text-zinc-500">
                            {product.category || "UnCategorized"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-lime950">
                      ${product.price.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.stock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                      >
                        {product.stock > 0
                          ? `${product.stock} in stock`
                          : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product._id}/edit`}
                          className="p-2 text-zinc-500 hover:text-lime-600 bg-lime-200 hover:bg-lime-100 rounded-lg transition-colors"
                        >
                          <EditIcon className="size-4" />
                        </Link>
                        <button
                          onClick={() =>
                            handleMarkOutOfStock(product._id, product.name)
                          }
                          title="Mark Out of Stock"
                          className="p-2 text-orange-700 hover:text-red-600 bg-orange-300 hover:bg-orange-200 rounded-lg transition-colors"
                        >
                          <XIcon className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default AdminProducts;
