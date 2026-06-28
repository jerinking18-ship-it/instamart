import { KeyRoundIcon } from "lucide-react";

interface Props {
  order: any;
}

export default function OrderOTP({ order }: Props) {
  if (!order) return null;

  const status = String(order.status || "").trim();
  const otp = String(order.deliveryOtp || "");

  const showOtp =
    otp.length > 0 &&
    ["Assigned", "Packed", "Out for Delivery"].includes(status);

  if (!showOtp) return null;

  return (
    <div className="rounded-2xl p-6 bg-lime-950 text-white">
      <div className="flex items-center gap-3 mb-4">
        <KeyRoundIcon className="size-6" />

        <div>
          <h3 className="font-semibold text-lg">Delivery OTP</h3>
          <p className="text-sm opacity-80">
            Share this OTP with your delivery partner
          </p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {otp.split("").map((digit: string, index: number) => (
          <div
            key={index}
            className="w-12 h-12 rounded-lg bg-white text-lime-950 font-bold text-xl flex items-center justify-center"
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  );
}
