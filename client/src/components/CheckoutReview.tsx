import { CheckIcon, TruckIcon } from "lucide-react";
import type { AddressType } from "../types";

interface CheckoutReviewProps {
  address: AddressType;
  items: any[];
  handlePlaceOrder: () => void;
  loading: boolean;
  total: number;
}

export default function CheckoutReview({
  address,
  items,
  handlePlaceOrder,
  loading,
  total,
}: CheckoutReviewProps) {
  const currency = import.meta.env.VITE_CURRENCY_SYMBOL || "$";

  return (
    <div className="bg-lime-50 rounded-lg p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-950 mb-5 flex items-center gap-2">
        <CheckIcon className="size-5" /> Review Your Order
      </h2>

      {/* Delivery Info */}
      <div className="mb-5 p-4 bg-white rounded-xl">
        <div className="flex items-center gap-2 mb-2">
          <TruckIcon className="size-4 text-app-green" />
          <span className="text-sm font-semibold text-lime-950">
            Delivery Address
          </span>
        </div>
        <p className="text-sm text-zinc-500">
          {address.label} — {address.address}, {address.city}, {address.state}{" "}
          {address.zip}
        </p>
      </div>

      {/* Items */}
      <div className="space-y-3 mb-5">
        {items.map((item) => (
          <div key={item.product._id} className="flex items-center gap-3 ">
            <img
              src={item.product.image[0]}
              alt={item.product.name}
              className="size-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-lime-950">
                {item.product.name}
              </p>
              <p className="text-xs text-zinc-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold">
              {currency}
              {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading}
        className="w-full py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-app-orange-dark transition-colors disabled:opacity-60 active:scale-[0.98]"
      >
        {loading
          ? "Placing Order..."
          : `Place Order — ${currency}${total.toFixed(2)}`}
      </button>
    </div>
  );
}
