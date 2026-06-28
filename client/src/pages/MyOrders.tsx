import React, { useEffect, useState } from "react";
import type { OrderType } from "../types";
import { Link, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { dummyOrders, statusColors } from "../assets";
import Loading from "../components/Loading";
import { Calendar1Icon, ChevronRightIcon, PackageIcon } from "lucide-react";

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activTab, setActiveTab] = useState("all");
  const [searchParams, setSearchParams] = useSearchParams();

  const tabs = ["all", "Placed", "Out for Delivery", "Delivered"];

  const { clearCart } = useAppContext();
  const fectchOrders = async () => {
    setOrders(dummyOrders as any);
    setLoading(false);
  };
  useEffect(() => {
    if (searchParams.get("clearCart")) {
      clearCart();
      setSearchParams({});
      setTimeout(() => {
        fectchOrders();
      }, 2000);
    } else {
      fectchOrders();
    }
  }, [activTab, searchParams]);

  return (
    <div className="min-h-screen mb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-semibold text-lime-950 mb-6">My Orders</h1>
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${activTab === tab ? "bg-lime-950 text-white" : "text-zinc-700 hover:bg-white bg-lime-50"}`}
            >
              {tab === "all" ? "All Orders" : tab}
            </button>
          ))}
        </div>
        {loading ? (
          <Loading />
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <PackageIcon className="size-16 text-zinc-400 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-lime-950 mb-2 ">
              No Orders Found
            </h2>
            <p className="text-sm text-zinc-500 mb-4">
              Start shopping to see yours odrders
            </p>
            <Link
              to="/products"
              className="inline-flex px-4 py-2 bg-lime-950 text-white text-sm rounded"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders
              .filter(
                (order) => activTab === "all" || order.status === activTab,
              )
              .map((order) => (
                <Link
                  key={order._id}
                  to={`/orders/${order._id}`}
                  className="block max-w-4xl bg-lime-50 rounded-lg hover:shadow  transition-all"
                >
                  <div className="flex items-start justify-between mb-3 px-8 py-3">
                    <div>
                      <p className="text-sm font-medium text-lime-950">
                        Order #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar1Icon className="text-zinc-500 size-3" />
                        <span className="text-xs text-zinc-500">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[order.status || " bg-zinc-100 text-zinc-700"]}`}
                      >
                        {order.status}{" "}
                      </span>
                      <ChevronRightIcon className="size-4 text-zinc-500" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3 px-5">
                    {order.items.slice(0, 4).map((item, index) => (
                      <img
                        key={index}
                        src={item.image}
                        alt={item.name}
                        className="size-16 sm:size-16 rounded object-cover border border-zinc-300 ml-3  px-1 py-1"
                      />
                    ))}
                    {order.items.length > 4 && (
                      <div className="size-12 sm:size-16 rounded-lg bg-lime-400 flrx-center text-xs font-semibold text-lime-950">
                        {" "}
                        +{order.items.length - 4}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-center  text-sm px-8 pb-3">
                    <span className="text-zinc-500">
                      {order.items.length} items
                    </span>
                    <span className="font-semibold text-lime-950">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
