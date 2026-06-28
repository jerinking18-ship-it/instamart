import React from "react";
import { type ProductTypes } from "../types";
import { useAppContext } from "../context/AppContext";
import { Star } from "lucide-react";

interface ProductProps {
  product: ProductTypes;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  const { navigate, addToCart, removeFromCart, cartCount, items } =
    useAppContext();
  const cartItems = items.find((item) => item.product._id === product._id);

  return (
    <div
      className="bg-white rounded overflow-hidden border border-zinc-200 hover:shadow-md transition-all duration-300 group animate-fade-in cursor-pointer w-48 "
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="relative ">
        <img
          className=" w-48 h-47 Object-cover p-4 group-hover:p-2 transition-all duration-300 "
          src={product?.image?.[0]}
          alt={product.name}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.discount > 0 && (
            <span className="px-2 py-0.5 text-[10px] font-semibold uppercase bg-orange-600 text-white rounded">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>
      <div className="px-3.5 text-zinc-700 ">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-black leading-snug mb-1 lime-clamp-2 ">
              {product.name}
            </h3>
            <span className="text-xs mb-3 ">{product.unit}</span>
            {product.ratings > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <Star className="size-3 text-amber-500 fill-amber-500" />
                <span className="text-xs font-medium text-zinc-700">
                  {product.ratings}
                </span>
                <span className="text-xs text-zinc-500">
                  ({product.reviewCount})
                </span>
              </div>
            )}
          </div>
          {!cartItems ? (
            <button
              className="rounded-lg border border-lime-600 px-4.5 py-1.5 font-semibold text-lime-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center rounded-lg bg-lime-400 text-white">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(product._id);
                }}
                className="px-1 py-1 text-lg font-bold text-white cursor-pointer"
              >
                -
              </button>

              <span className="min-w-8 text-center font-semibold  ">
                {cartCount}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="px-1 py-1 text-lg font-bold text-white cursor-pointer"
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center  gap-1 truncate  ">
            <span className="text-base font-medium mb- bg-orange-500 text-white rounded py-1 px-1.5">
              ${product.offerPrice.toFixed(1)}
            </span>
            {product.price > product.offerPrice && (
              <span className="  text-xs text- line-through ml-0.5 ">
                ${product.price.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
