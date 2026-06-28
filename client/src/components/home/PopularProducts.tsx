import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";
import { dummyProducts } from "../../assets";
import type { ProductTypes } from "../../types";
import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PopularProducts: React.FC = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  useEffect(() => {
    setProducts(dummyProducts);
  }, []);

  return (
    <section className="pb-16 mt-2">
      <div className="max-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl text-lime-950 font-semibold pl-4">
              Products
            </h2>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
          >
            View All <ArrowRightIcon className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularProducts;
