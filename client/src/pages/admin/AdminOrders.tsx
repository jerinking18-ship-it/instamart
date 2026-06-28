import React from "react";
import { useState, useEffect } from "react";
import { TruckIcon } from "lucide-react";
import toast from "react-hot-toast";
import type { DeliveryPartnerType } from "../../types";
import Loading from "../../components/Loading";
import { dummyOrders } from "../../assets";

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [partners, setPartners] = useState<DeliveryPartnerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [assignModal, setAssignModal] = useState<string | null>(null);
  const [selectedPartner, setSelectedPartner] = useState("");

  const fectchOrders = async () => {
    setOrders(dummyOrders as any);
    setTimeout(() => setLoading(false), 1000);
  };
  const fectchPartners = async () => {
    setPartners(dummyOrders as any);
    setTimeout(() => setLoading(false), 1000);
  };
  useEffect(() => {
    fectchOrders();
    fectchPartners();
  }, []);
  const handleStatusChange = async (id: string, newStatus: string) => {
    console.log(id, newStatus);
  };
  const handleAssign = async () => {
    if (!assignModal || !selectedPartner) return;
    toast.success("Delivery partner assigned!");
    setAssignModal(null);
    setSelectedPartner("");
  };

  const statusOptions = [
    "Placed",
    "Confirmed",
    "Assigned",
    "Packed",
    "Out for Delivery",
    "Delivered",
    "Cancelled",
  ];
  const statusColors: any = {
    Placed: "bg-blue-100 text-blue-800",
    Confirmed: "bg-amber-100 text-amber-800",
    Assigned: "bg-indigo-100 text-indigo-800",
    Packed: "bg-cyan-100 text-cyan-800",
    "Out for Delivery": "bg-orange-100 text-orange-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  if (loading) return <Loading />;

  return (
    <>
      <div className="bg-lime-50 rounded-lg shadow-sm border border-zinc-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-200">
          <h2 className="text-xl font-semibold text-lime-950">Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-lime-950 text-white uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Delivery Partner</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 ">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-zinc-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-white transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibol text-lime-950">
                        #{order._id.slice(-10)}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-zinc-900">
                        {order.user?.name || "Unknown"}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {order.user?.email || "No Email"}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-medium text-lime-950">
                      $ {order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      {order.deliveryPartner ? (
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-lime-950 flex items-center justify-center">
                            <span className="text-white text-[10px] font-semibold">
                              {order.deliveryPartner.name?.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-lime-950">
                              {order.deliveryPartner.name}
                            </p>
                            <p className="text-[10px] text-zinc-500">
                              {order.deliveryPartner.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setAssignModal(order._id);
                            setSelectedPartner("");
                          }}
                          className="px-3 py-1.5 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors flex items-center gap-1"
                        >
                          <TruckIcon className="size-3" /> Assign
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border-r-8 border-transparent outline-none cursor-pointer leading-tight ${statusColors[order.status] || "bg-zinc-100 text-zinc-800"}`}
                      >
                        {statusOptions.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {assignModal && (
        <>
          <div
            className="fixed inset bg-lime-900 backdrop-blur z-50 "
            onClick={() => setAssignModal(null)}
          >
            <div className="fixed inset-0 bg-lime rounded-lg p-6 w-full max-w-sm annimate-fade-in">
              <h3 className="text-lg font-semibold text-lime-950 mb-4">
                Assign Delivery Partner
              </h3>
              {partners.length === 0 ? (
                <p className="text-sm text-zinc-500 mb-4">
                  No active delivery partners. Please onboard a partner first.
                </p>
              ) : (
                <div className="space-y-2 mb-5 max-h-60 overflow-y-auto">
                  {partners.map((p) => (
                    <label
                      key={p._id}
                      className={`flex items-center gap-3 rounded-lg border cursor-pointer transition-colors ${selectedPartner === p._id ? "bg-lime-950 text-white" : "bg-lime-50 text-lime-950 border-zinc-200"}`}
                    >
                      <input
                        type="radio"
                        name="partner"
                        value={p._id}
                        checked={selectedPartner === p._id}
                        onChange={() => setSelectedPartner(p._id)}
                        className="text-lime-950"
                      />
                      <div className="size-8 rounded-full bg-lime-950 flex items-center justify-center">
                        <span className="text-white text-xs font-medium ">
                          {p.name.charAt(0)}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
          {assignModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl">
                <h2 className="text-lg font-semibold mb-4">
                  Assign Delivery Partner
                </h2>

                <div className="space-y-3 max-h-72 overflow-y-auto">
                  {partners.map((partner) => (
                    <label
                      key={partner._id}
                      className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                        selectedPartner === partner._id
                          ? "border-green-600 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        value={partner._id}
                        checked={selectedPartner === partner._id}
                        onChange={(e) => setSelectedPartner(e.target.value)}
                      />

                      <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center">
                        {partner.name?.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium">{partner.name}</p>
                        <p className="text-xs text-zinc-500">
                          {partner.vehicleType} • {partner.phone}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => {
                      setAssignModal(null);
                      setSelectedPartner("");
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-200"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAssign}
                    disabled={!selectedPartner}
                    className="px-4 py-2 rounded-lg bg-green-950 text-white disabled:opacity-50"
                  >
                    Assign
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminOrders;
