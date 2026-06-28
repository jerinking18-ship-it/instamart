import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { ProductTypes } from "../types";
import { categoriesData, dummyProducts } from "../assets";
import { ChevronDownIcon, HomeIcon } from "lucide-react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import FilterPanel from "../components/FilterPanel";

const Products: React.FC = () => {
  const [searchParams, setSearchPramas] = useSearchParams();
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [totalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const category = searchParams.get("category") || "";
  const organic = searchParams.get("organic") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;
  const minPrice = searchParams.get("minPrice") || "";
  const MaxPrice = searchParams.get("maxPrice") || "";

  const fetchProducts = async () => {
    setLoading(true);
    setProducts(
      dummyProducts.filter(
        (product) => product.category === category || category === "",
      ),
    );
    setLoading(false);
  };
  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    if (key !== "page") {
      newParams.delete("page");
    }
    setSearchPramas(newParams);
  };
  const clearFilter = () => setSearchPramas({});
  const activeCategory = categoriesData.find((cat) => cat.slug === category);
  const hasFilters = Boolean(
    category || organic || sort || minPrice || MaxPrice || page,
  );
  useEffect(() => {
    fetchProducts();
  }, [category, organic, sort, page, minPrice, MaxPrice]);

  return (
    <div className="min-h-screen border-t border-zinc-200 mt-4 ">
      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-6 ">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6  ">
          <Link className="hover:text-orange-600 transition-colors" to={"/"}>
            <HomeIcon className="size-4" />
          </Link>
          <span>/</span>
          <span className="text-lime-950 font-medium ">
            {activeCategory?.text || "All Products"}
          </span>
        </nav>
        <div className="flex gap-8 xl:gap-10">
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-lime-50 rounded-lg p-4 sticky top-24">
              <FilterPanel
                categories={categoriesData}
                category={category}
                organic={organic}
                clearFilter={clearFilter}
                hasFilters={hasFilters}
                updateFilter={updateFilter}
                minPrice={minPrice}
                maxPrice={MaxPrice}
              />
            </div>
          </aside>
          <main className="flex-1 ">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-lime-950">
                  {activeCategory ? activeCategory.text : "All Products"}
                </h1>
                <p className="text-sm text-zinc-500 mt-0.5">
                  {products.length} products found
                </p>
              </div>
              <div className="flex flex-col lg:items-center gap-3">
                <div className="relative">
                  <select
                    className="appearance-none pl-3 pr-8 py-2 text-sm bg-white rounded border border-zinc-300 focus:border- outline-none cursor-pointer"
                    value={sort}
                    onChange={(e) => updateFilter("sort", e.target.value)}
                  >
                    <option value="">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                    <option value="name">A to Z</option>
                  </select>
                  <ChevronDownIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                </div>
              </div>
            </div>
            <div>
              {loading ? (
                <Loading />
              ) : products.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-lg font-semibold test- mb2">
                    No products found
                  </p>
                  <p className="text-sm text- mb-4">
                    Try adjusting your filters
                  </p>
                  <button
                    onClick={clearFilter}
                    className="px-5 py-2 text-sm font-medium bg-lime-100 text-lime-950 rounded-lg hover:bg-lime-700 hover:text-white ransition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
                  {products.map(
                    (product) =>
                      product.stock > 0 && (
                        <ProductCard key={product._id} product={product} />
                      ),
                  )}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex-center gap-2 mt-16">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      onClick={() => {
                        updateFilter("page", String(i + 1));
                        scrollTo(0, 0);
                      }}
                      className={`size-9 rounded-lg text-sm font-medium transition-colors ${page === i ? "bg- text-white" : "bg-white hover:bg-lime-100 "}`}
                    >
                      {i + 1}
                    </button>
                  ))}{" "}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
