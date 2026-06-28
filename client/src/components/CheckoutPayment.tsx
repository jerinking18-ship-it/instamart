import { ChevronRightIcon, CreditCardIcon } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CheckoutPaymentProps {
  setStep: Dispatch<SetStateAction<string>>;
  paymentMethod: string;
  setPaymentMethod: Dispatch<SetStateAction<string>>;
}

export default function CheckoutPayment({
  setStep,
  paymentMethod,
  setPaymentMethod,
}: CheckoutPaymentProps) {
  return (
    <div className="bg-lime-50 rounded-lg p-6 animate-fade-in">
      <h2 className="text-lg font-semibold text-lime-950 mb-5 flex items-center gap-2">
        <CreditCardIcon className="size-5 text-orange-600" /> Payment Method
      </h2>
      <div className="space-y-3">
        {[
          {
            value: "card",
            label: "Credit / Debit Card",
            desc: "Pay securely with your card",
          },
          {
            value: "cash",
            label: "Cash on Delivery",
            desc: "Pay when you receive",
          },
        ].map((method) => (
          <label
            key={method.value}
            className={`flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all ${paymentMethod === method.value ? "border-orange-600 bg-orange-100 " : "border-zinc-200 hover:border-lime-600 bg-white"}`}
          >
            <input
              type="radio"
              name="payment"
              value={method.value}
              checked={paymentMethod === method.value}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="size-4 text-lime-900"
            />
            <div>
              <p className="text-sm font-semibold text-lime-950">
                {method.label}
              </p>
              <p className="text-xs text-zinc-500">{method.desc}</p>
            </div>
          </label>
        ))}
      </div>
      <button
        onClick={() => {
          setStep("review");
          scrollTo(0, 0);
        }}
        className="mt-6 px-6 py-3 bg-lime-950 text-white font-semibold rounded-xl hover:bg-lime-600 transition-colors flex items-center gap-2"
      >
        Review Order <ChevronRightIcon className="size-4" />
      </button>
    </div>
  );
}
