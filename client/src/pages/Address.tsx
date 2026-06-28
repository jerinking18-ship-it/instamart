import React, { useEffect, useState } from "react";
import type { AddressType } from "../types";
import { dummyAddress } from "../assets";
import { MapPinIcon, PlusIcon } from "lucide-react";
import Loading from "../components/Loading";
import AddressCard from "../components/AddressCard";
import AddAddress from "../components/AddAddress";

const Address: React.FC = () => {
  const [address, setAddress] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    label: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
  });

  const resetForm = () => {
    setForm({
      label: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      isDefault: false,
    });
    setShowForm(false);
    setEditingId(null);
  };
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
  };
  const onEditHandler = (address: AddressType) => {
    setForm({
      label: address.label,
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      isDefault: address.isDefault,
    });
    setEditingId(address._id);
    setShowForm(true);
  };

  useEffect(() => {
    setAddress(dummyAddress as any);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <div className="m-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-lime-950">My Address</h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="px-4 py-2 bg-lime-950 text-white text-sm rounded-lg hover:bg-lime-600 transition-colors flex items-center gap-2"
          >
            <PlusIcon /> Add New Address
          </button>
        </div>
        {showForm && (
          <AddAddress
            resetForm={resetForm}
            handleSubmit={handleSubmit}
            form={form}
            setForm={setForm}
            editingId={editingId}
          />
        )}
        {loading ? (
          <Loading />
        ) : address.length === 0 ? (
          <div className="text-center py-16">
            <MapPinIcon className="size-16 text-zinc-400 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-lime-950 mb-2 ">
              No Address Found
            </h2>
            <p className="text-sm text-zinc-500 ">Add Address for checkout</p>
          </div>
        ) : (
          <div className="space-y-4">
            {address.map((add) => (
              <AddressCard
                key={add._id}
                onEditHandler={onEditHandler}
                address={add}
                setAddress={setAddress}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;
