import React, { useEffect, useState } from "react";
import type { ProductTypes } from "../types";
import { dummyProducts } from "../assets";
import { Zap } from "lucide-react";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";

const FlashDeals: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setProducts(dummyProducts.filter((product: any) => product.stock > 0));
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (
    <div className="min-h-screen">
      <div className="bg-linear-to-r from-orange-600 to-orange-700 text-white py-10 mt-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="size-6 fill-white" />
            <h1 className="text-3xl font-semibold">Flash Deal</h1>
            <Zap className="size-6 fill-white" />
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            Limited-time offers on your favorite products. Grab them before
            they're gone!
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <Zap className="size-16 text- mx-auto mb-4" />
            <h2 className="text-lg font-semibold text- mb2">No Deals found</h2>
            <p className="text-sm text- ">
              Check back soon for amazing offers!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
            {products.map(
              (product) =>
                product.stock > 0 && (
                  <ProductCard key={product._id} product={product} />
                ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashDeals;
