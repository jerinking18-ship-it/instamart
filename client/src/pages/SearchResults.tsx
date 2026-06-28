import React, { useEffect, useState } from "react";
import { type ProductTypes } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { dummyProducts } from "../assets";
import { Home, SearchIcon } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

const SearchResults: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    setProducts(
      dummyProducts.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()),
      ),
    );
    setLoading(false);
  }, [query]);

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link to="/" className="hover:text-lime-600 transition-colors">
            <Home className="size-4 text-lime-600" />
          </Link>
          <span>/</span>
          <span className="text-lime-950">Search Results</span>
        </nav>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-lime-950 mb-1">
            Result for "{query}"
          </h1>
          <p className="text-sm text-zinc-500">
            {loading ? "Loading..." : `${products.length} items found`}
          </p>
        </div>
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <SearchIcon className="size-16 text-zinc-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-lime-950 mb-4">
              No Products Found
            </h2>
            <p className="text-sm text-zinc-500 mb-6 max-w-md mx-auto">
              we couldn't find any products matching "{query}".{" "}
            </p>
            <Link
              to="/products"
              className="inline-flex px-5 py-2.5 bg-lime-950 text-white text-sm rounded-lg hover:bg-lime-600 transition-colors font-medium"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
