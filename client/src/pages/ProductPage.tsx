import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import type { ProductTypes } from "../types";
import { dummyProducts } from "../assets";
import Loading from "../components/Loading";
import {
  ArrowRightIcon,
  Home,
  LeafIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  StarIcon,
} from "lucide-react";
import ReviewSection from "../components/DummyReviewSection";
import ProductCard from "../components/ProductCard";

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { items, addToCart, updateQuatity, removeFromCart } = useAppContext();

  const [product, setProduct] = useState<ProductTypes | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [localQuantity, setLocalQuantity] = useState(1);
  const handleMinus = () => {
    if (inCart) {
      if (cartItem.quantity > 1)
        updateQuatity(product!._id, cartItem.quantity - 1);
      else removeFromCart(product!._id);
    } else {
      setLocalQuantity(Math.max(1, localQuantity - 1));
    }
  };
  const handlePlus = () => {
    if (inCart) updateQuatity(product!._id, cartItem.quantity + 1);
    else setLocalQuantity(localQuantity + 1);
  };

  useEffect(() => {
    setLoading(true);
    setLocalQuantity(1);
    window.scrollTo(0, 0);
    const produuct = dummyProducts.find((product) => product._id === id);
    setProduct(produuct!);
    setRelatedProducts(dummyProducts.filter((product) => product._id !== id));
    setLoading(false);
  }, [id]);

  useEffect(() => {}, [id, navigate]);
  if (loading) return <Loading />;
  if (!product) return null;

  const cartItem = items.find((item) => item.product._id === product._id);
  const inCart = !!cartItem;
  const displayQuantity = inCart ? cartItem.quantity : localQuantity;
  const catergoryLabel = product.category.replace("-", " ");

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link to="/" className="hover:text-orange-600 transition-colors">
            <Home className="size-4" />
          </Link>
          <Link
            to="products"
            className="hover:text-orange-600 transition-colors"
          >
            Products
          </Link>

          <span>/</span>
          <Link
            to={`products?category=${product.category}`}
            className="hover:text-orange-600 transition-colors capitalize"
          >
            {catergoryLabel}
          </Link>
          <span>/</span>
          <span className="text-lime-600 font-medium truncate">
            {product.name}
          </span>
        </nav>

        <div className="bg-lime-50 rounded overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative flex items-center justify-center p-8 md:p-12 min-h-[320px] md:min-h-[480px]">
              <img
                src={product.image[0]}
                alt={product.name}
                className="max-h-[360px] w-auto object-contain"
              />
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {product.isOrganic && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-sm font-ssemibold bg-orange-500 text-white rounded-full">
                    <LeafIcon className="w-3 h-3" />
                    Organic
                  </span>
                )}
                {product.discount > 0 && (
                  <span className="flex items-center gap-1 px-2.5 py-1 text-sm font-ssemibold bg-orange-500 text-white rounded-full">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center ">
              <span className="text-xs font-medium text-zinc-500 tracking-wider mb-2 capitalize">
                {catergoryLabel}
              </span>
              <h1 className="text-2xl md:text-3xl font-semibold text-lime-950 mb-3">
                {product.name}
              </h1>
              {product.ratings > 0 && (
                <div className="flex items-center gap-1 mb-5">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <StarIcon
                        key={star}
                        className={`w-4 h-4 ${star <= Math.round(product.ratings) ? " text-orange-500 fill-orange-500" : "text-orange-300 fill-orange-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-lime-950">
                    {product.ratings}
                  </span>
                  <span className="text-sm text-zinc-500">
                    ({product.reviewCount} rewiews)
                  </span>
                </div>
              )}
              <div>
                <span className="text-3xl md:text-4xl font-semibold text-lime-950 mb-3 ">
                  {product.offerPrice.toFixed(2)}
                </span>
                <span className="text-lg text-zinc-500 line-through ml-1">
                  {product.price.toFixed(2)}
                </span>
              </div>
              <ul className="list-none ml-2 text-zinc-500 text-sm mt-3 mb-6 leading-relaxed">
                {product.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-lime-300 rounded overflow-hidden bg-lime-200">
                  <button
                    onClick={handleMinus}
                    className="p-4 hover:bg-lime-400 transition-colors"
                  >
                    <MinusIcon className="w-4 h-4  text-lime-950" />
                  </button>
                  <span className="px-5 text-sm font-semibold min-w-[40px] text-center">
                    {displayQuantity}
                  </span>
                  <button
                    onClick={handlePlus}
                    className="p-4 hover:bg-lime-400 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4 text-lime-950" />
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (!inCart) addToCart(product, localQuantity);
                  }}
                  className={`flex-1 py-3 font-semibold rounded transition-colors flex items-center justify-center gap-2   active:scale-[0.98] ${inCart ? "bg-orange-200 text-lime-950 border border-orange-500" : "bg-orange-500 text-white hover:bg-orange-600"} `}
                >
                  <ShoppingCartIcon className="w-4 h-4" />
                  {inCart ? "Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {product.reviewCount > 0 && <ReviewSection />}
        {relatedProducts.length > 0 && (
          <section className="mt-12 mb-36">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-lime-950">
                  Similar Product
                </h2>
                <p className="text-sm text-zinc-500 mt-1">
                  More from {catergoryLabel}
                </p>
              </div>
              <Link
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
                to={`/products?category=${product.category}`}
              >
                View All <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 xl:gap-8">
              {relatedProducts.slice(0, 6).map((rp) => (
                <ProductCard key={rp._id} product={rp} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
