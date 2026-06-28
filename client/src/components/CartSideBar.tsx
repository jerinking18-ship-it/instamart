import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

const CartSideBar: React.FC = () => {
  const {
    items,
    cartAmount,
    removeAllFromCart,
    updateQuatity,
    setIsCartOpen,
    navigate,
    isCartOpen,
  } = useAppContext();
  if (!isCartOpen) return null;
  const deliveryFee = cartAmount > 200 ? 0 : 20;
  const total = cartAmount + deliveryFee;
  return (
    <>
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 z-50 bg-black/40"
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-lime-50 z-50 shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between p-5 bg-white border-b border-lime-100 rounded-b-2xl">
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="size-5 text-orange-500 " />
            <h2 className="text-lg font-medium">My Cart</h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-orange-100 ">
              {items.length} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-orange-200 transition-colors"
          >
            <XIcon className="size-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBagIcon className="size-16 text-orange-500 mb-4" />
              <h4 className="text-lg font-medium mb-1">Your Cart is Empty</h4>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product._id}
                className="flex gap-3 bg-white rounded-2xl p-3 border border-lime-100"
              >
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="size-16 rounded object-cover shrink-0"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold truncate text-lime-950">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-zinc-500">
                    ${item.product.offerPrice.toFixed(2)} / {item.product.unit}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() =>
                          updateQuatity(item.product._id, item.quantity - 1)
                        }
                        className="size-7 rounded-lg bg-lime-100 border border-orange-300 flex-center"
                      >
                        <MinusIcon className="size-3 text-orange-300 ml-1.5" />
                      </button>
                      <span className="text-sm font-semibold text-lime-950 w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuatity(item.product._id, item.quantity + 1)
                        }
                        className="size-7 rounded-lg bg-lime-100 border border-orange-300  flex-center"
                      >
                        <PlusIcon className="size-3 text-orange-300 ml-1.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-lime-950">
                        ${(item.product.offerPrice * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeAllFromCart(item.product._id)}
                        className="p-1 text-orange-600 hover:text-lime-500 transition-colors"
                      >
                        <Trash2Icon className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-5 mb-5 border border-orange-100  bg-white rounded-2xl space-y-3 mr-4 ml-4">
            <div className="flex justify-between text-xs border-b border-orange-100 pb-3 text-zinc-500">
              <span>Total</span>
              <span className="font-medium text-zinc-900">
                ${cartAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs border-b border-orange-100 pb-3 text-zinc-500">
              <span>Delivery</span>
              <span className="font-medium text-zinc-900 ">
                {deliveryFee === 0 ? (
                  <span
                    className="
                  text-green-600"
                  >
                    $Free
                  </span>
                ) : (
                  `$${deliveryFee.toFixed()}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-xs border-b border-orange-100 pb-3 text-zinc-500">
              <span>Handling Fee</span>
              <span className="font-medium text-lime-600">
                $<span>Free</span>
              </span>
            </div>
            {deliveryFee > 0 && (
              <p className="text-xs text-zinc-500 text-center">
                {" "}
                Free delivery on orders above $200!
              </p>
            )}
            <div className="flex justify-between text-base font-semibold text-lime-950">
              <span className="text-zinc-900">Total</span>
              <span className="font-medium text-zinc-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={() => {
                navigate("/checkout");
                setIsCartOpen(false);
                window.scrollTo(0, 0);
              }}
              className=" flex-center justify-centercenter w-full py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-400 transition-colors gap-2 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSideBar;
