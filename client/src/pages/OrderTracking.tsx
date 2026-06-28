import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { OrderType } from "../types";
import { dummyOrders } from "../assets";
import Loading from "../components/Loading";

import OrderOTP from "../components/OrderOTP";
import LiveMap from "../components/LiveMap";
import OrderTimeLine from "../components/OrderTimeLine";
import { MapPinIcon, PhoneIcon } from "lucide-react";

const OrderTracking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [liveLoacation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    setOrder(dummyOrders.find((order) => order._id === id) as any);
    setLoading(false);
  }, [id, navigate]);

  if (loading) return <Loading />;
  if (!order) return null;

  const isActiveOrder = !["Delivered", "Cancelled"].includes(order!.status);
  return (
    <div className="min-h-screen mb-20 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-lime-950">
              Order #{order!._id.slice(-10).toUpperCase()}
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Placed on{" "}
              {new Date(order!.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${order!.status === "Delivered" ? "bg-green-100 text-green-700" : order!.status === "Cancelled" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}
          >
            {order!.status}
          </span>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {" "}
            <OrderOTP order={order} />
            <LiveMap order={order} liveLocation={liveLoacation} />
            <OrderTimeLine order={order} />
            {order.deliveryPartner && isActiveOrder && (
              <div className="bg-orange-100/70 rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-11 rounded-full bg-lime-950 flex items-center justify-center">
                    <span className="text-white font-semibol text-sm ">
                      {order.deliveryPartner.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-lime-950">
                      {order.deliveryPartner.name}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize">
                      {order.deliveryPartner.vehicleType} Delivery Partner
                    </p>
                  </div>
                </div>
                <a
                  href={`tel:${order.deliveryPartner.phone}`}
                  className="p-2.5 bg-white rounded-full hover:bg-lime-100 transition-colors"
                >
                  <PhoneIcon className="size-4 text-lime-950" />
                </a>
              </div>
            )}
          </div>
          <div className="space-y-5">
            <div className=" bg-lime-50 rounded-2xl p-5 text-lime-950">
              <h3 className="text-sm font-semibold mb-3 text-lime-950 flex items-center gap-2">
                <MapPinIcon className="size-4 " />
                Delivery Address
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed ">
                {order?.shippingAddress.label}
                <br />
                {order?.shippingAddress.address}
                <br />
                {order?.shippingAddress.city}
                <br />
                {order?.shippingAddress.state}
                <br />
                {order?.shippingAddress.zip}
              </p>
            </div>
            <div className="bg-orange-50 rounded-2xl p-5 text-orange-950">
              <h3 className="">Items ({order?.items.length})</h3>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 ">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="size-10 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-lime-950 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-zinc-500">x {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold text-orange-950">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-zinc-200 space-y-1.5 text-sm">
                <div className="flex justify-between ">
                  <span className="text-zinc-500">Total</span>
                  <span className="text-sm  text-orange-950">
                    ${order?.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span className="text-zinc-500">Delivery</span>
                  <span>
                    {order?.deliveryFee === 0
                      ? "Free"
                      : `$${order?.deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span className="text-zinc-500">Tax</span>
                  <span>${order?.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-zinc-200 font-semibold text-orange-950 ">
                  <span className="text-zinc-500">Total Amount</span>
                  <span>${order?.tax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
