import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { dummyAddress } from "../assets";
import type { AddressType } from "../types";
import {
  CheckIcon,
  ChevronRightIcon,
  CreditCardIcon,
  MapPinIcon,
} from "lucide-react";
import CheckoutAddress from "../components/CheckoutAddress";
import CheckoutPayment from "../components/CheckoutPayment";
import CheckoutReview from "../components/CheckoutReview";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState("address");
  const [loading, setLoading] = useState(false);
  const { items, cartAmount } = useAppContext();
  const user = { user: { addresses: dummyAddress } };
  const [adress, setAddress] = useState<AddressType>({
    _id: "",
    label: "Home",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    lat: 0,
    lng: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const deliveryFee = cartAmount > 200 ? 0 : 20;
  const Tax = cartAmount * 0.08;
  const total = cartAmount + deliveryFee + Tax;

  const steps: { key: string; label: string; icon: typeof MapPinIcon }[] = [
    { key: "address", label: "address", icon: MapPinIcon },
    { key: "payment", label: "payment", icon: CreditCardIcon },
    { key: "rewiew", label: "review", icon: CheckIcon },
  ];

  const handlePlaceOrder = async () => {
    setLoading(true);
    navigate("/orders");
  };
  useState(() => {
    if (user?.user?.addresses?.length === 0) {
      const defaultAddr =
        user?.user?.addresses?.find((a) => a.isDefault) ||
        user.user.addresses[0];
      setAddress;
      setAddress({
        _id: defaultAddr?._id,
        label: defaultAddr?.label,
        address: defaultAddr?.address,
        city: defaultAddr?.city,
        state: defaultAddr?.state,
        zip: defaultAddr?.zip,
        isDefault: defaultAddr?.isDefault,
        lat: defaultAddr?.lat,
        lng: defaultAddr?.lng,
      });
    }
  });

  if (items.length === 0)
    return (
      <div className="min-h-screen flex items-center justify-center ">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-lime-950 mb-2">
            Your Cart is Empty!
          </h2>
          <p className="text-sm text-zinc-500 mb-4">
            Add products to Checkout{" "}
          </p>
          <button
            className="px-5 py-2.5 bg-lime-950 text-white text-sm font-medium rounded-lg hover:bg-lime-600 transition-colors"
            onClick={() => navigate("/products")}
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-lime-950 mb-8">Checkout</h1>
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.key} className="flex items-center gap-2">
              <button
                onClick={() => setStep(s.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${step === s.key ? "bg-lime-950 text-white" : "bg-lime-50 text-lime-950"}`}
              >
                <s.icon className="size-4 text-app-green" /> {s.label}
                {i < steps.length - 1 && (
                  <ChevronRightIcon className="size-4 text-zinc-500" />
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {step === "address" && (
              <CheckoutAddress
                address={adress}
                setAddress={setAddress}
                setStep={setStep}
                user={user}
              />
            )}
            {step === "payment" && (
              <CheckoutPayment
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                setStep={setStep}
              />
            )}
            {step === "rewiew" && (
              <CheckoutReview
                address={adress}
                items={items}
                handlePlaceOrder={handlePlaceOrder}
                loading={loading}
                total={total}
              />
            )}
          </div>
          <div className="bg-lime-50 rounded-lg p-5 h-fit sticky top-24">
            <h3 className="text-sm font-semibold text-lime-950 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm bg-white rounded-lg p-4 ">
              <div className="flex justify-between">
                <span className="text-zinc-500">
                  Subtotal ({items.length} items)
                </span>
                <span className="text-lime-950">${cartAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Delivery</span>
                <span className="text-lime-950">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `$${deliveryFee.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tax</span>
                <span className="text-lime-950">${Tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-zinc-200 font-semibold text-lime-950">
                <span className="text-lime-950">Total</span>
                <span className="text-lime-950">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
