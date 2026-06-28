import React from "react";
import type { AddressType } from "../types";
import {
  CheckIcon,
  MapPinIcon,
  PencilIcon,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";

interface AddressCardProps {
  address: AddressType;
  onEditHandler: (address: AddressType) => void;
  setAddress: React.Dispatch<React.SetStateAction<AddressType[]>>;
}

const AddressCard: React.FC<AddressCardProps> = ({
  address,
  onEditHandler,
  setAddress,
}) => {
  const handleDelete = async (id: string) => {
    console.log(id);
  };

  return (
    <div
      key={address._id}
      className="max-w-3xl bg-lime-50 rounded-2xl p-6 flex items-start justify-between"
    >
      <div className="flex gap-4">
        <div className="size-10 rounded-xl bg-white flex items-center justify-center shrink-0">
          <MapPinIcon className="size-6 text-lime-600" />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-lime-950">
              {address.label}
            </p>
            {address.isDefault && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-medium bg-lime-950 text-white rounded-full">
                <CheckIcon className="size-2.5" />
                Default
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-500">
            {address.address} ,{address.city} , <br /> {address.state},
            {address.zip}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onEditHandler(address)}
          className="p-2 text-zinc-500 hover:text-lime-600 hover:bg-lime-100 transition-colors rounded-lg"
        >
          <PencilIcon className="size-4" />
        </button>
        <button
          onClick={() => handleDelete(address._id)}
          className="p-2 text-zinc-500 hover:text-orange-700 hover:bg-orange-100 transition-colors rounded-lg"
        >
          <Trash2Icon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
