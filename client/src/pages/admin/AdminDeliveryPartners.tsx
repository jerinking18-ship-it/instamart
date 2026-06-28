import React, { useEffect, useState } from "react";
import type { DeliveryPartnerType } from "../../types";
import { dummyDeliveryPartnerData } from "../../assets";
import Loading from "../../components/Loading";
import { MailIcon, PhoneIcon, PlusIcon, TruckIcon, XIcon } from "lucide-react";

const AdminDeliveryPartners: React.FC = () => {
  const [partners, setPartners] = useState<DeliveryPartnerType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    vehicleType: "bike",
  });

  const fectchPartners = async () => {
    setPartners(dummyDeliveryPartnerData as any);
    setTimeout(() => setLoading(false), 1000);
  };
  useEffect(() => {
    fectchPartners();
  }, []);
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const toggleActive = async (id: string, isActive: boolean) => {
    console.log(id, isActive);
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-semibold text-lime-950">
          Delivery Partners
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-lime-950 text-white text-sm rounded-lg hover:bg-lime-600 transition-colors flex items-center  gap-2"
        >
          <PlusIcon className="size-6 text-white" /> Add New Partner
        </button>
      </div>
      {partners.length === 0 ? (
        <div className="text-center py-16 bg-lime-50 rounded-lg border border-zinc-200 ">
          <TruckIcon className="size-16 text-zinc-400 mx-auto mb-4" />
          <p className="text-lg font-semibold text-lime-950 mb-1">
            No Delivery Partner Found
          </p>
          <p className="text-sm text-zinc-500">
            Onboard your first partner to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols- gap-4">
          {partners.map((partner) => (
            <div
              key={partner._id}
              className="bg-lime-50 rounded-lg border border-zinc-200 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-lime-950 flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {partner.name?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lime-950 text-sm">
                      {partner.name}
                    </p>
                    <p className="text-xs text-zinc-500 capitalize">
                      {partner.vehicleType}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2.5 py-1 text-[10px] font-semibold rounded-full ${partner.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {partner.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="space-y-1.5 text-sm text-zinc-600">
                <p className="flex items-center gap-2">
                  <MailIcon className="w-3.5 h-3.5 text-zinc-400" />
                  {partner.email}
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="w-3.5 h-3.5 text-zinc-400" />
                  {partner.phone}
                </p>
              </div>
              <button
                onClick={() => toggleActive(partner._id, partner.isActive)}
                className={`w-full py-2 text-xs font-medium rounded-lg transition-colors ${partner.isActive ? "bg-orange-100 text-red-600 hover:bg-orange-200" : "bg-green-50 text-green-600 hover:bg-green-100"}`}
              >
                {partner.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      )}
      {showForm && (
        <div
          onClick={() => setShowForm(false)}
          className="fixed inset-0 bg-white/80  backdrop-blur z-50"
        >
          <div className="flex inset-0 z-50 flex items-center justify-center p-4">
            <form
              onSubmit={handleSubmit}
              className="bg-lime-50 rounded-xl p-6 w-full max-w-lg animate-fade-in"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-lime-950">
                  Onboard Delivery Partner
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-orange-200 rounded-lg"
                >
                  <XIcon className="size-5 text-orange-600" />
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-200 focus:border-lime-600 outline-none bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-lime-950 mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-200 focus:border-lime-600 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lime-950 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-200 focus:border-lime-600 outline-none bg-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-lime mb-1.5">
                    Phone
                  </label>
                  <input
                    type="text"
                    required
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-200 focus:border-lime-600 outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-lime-950 mb-1.5">
                    Vehicle Type
                  </label>
                  <select
                    value={form.vehicleType}
                    onChange={(e) =>
                      setForm({ ...form, vehicleType: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-200 focus:border-lime-600 outline-none bg-white"
                  >
                    <option value="bike">Bike</option>
                    <option value="scooter">Scooter</option>
                    <option value="car">Car</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-6 w-117 py-3 bg-lime-950 text-white font-semibold rounded-lg hover:bg-lime-600 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? "Creating..." : "Create Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDeliveryPartners;
