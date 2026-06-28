import { ChevronRightIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const CheckoutAddress = ({ user, address, setAddress, setStep }: any) => {
  return (
    <div className="bg-lime-50 rounded-lg p-6 animate-fade-in  ">
      <h2 className="text-lg font-semibold text-lime-950 mb-5 flex items-center gap-2">
        <MapPinIcon className="size-5 text-lime-600" />
        Delivery Address
      </h2>

      {user?.addresses && user?.addresses.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-lime-950 mb-3">
            Saved Addresses
          </h3>

          <div className="grid sm:grid-cols-2 gap-3">
            {user.addresses.map((addr: any) => (
              <div
                key={addr._id || addr.label}
                onClick={() =>
                  setAddress({
                    label: addr.label,
                    address: addr.address,
                    city: addr.city,
                    state: addr.state,
                    zip: addr.zip,
                    lat: addr.lat,
                    lng: addr.lng,
                  })
                }
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  address.label === addr.label
                    ? "border-lime-900 bg-lime-50"
                    : "border-zinc-200 hover:border-lime-900"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <MapPinIcon className="size-4 text-lime-950" />

                  <span className="font-semibold text-lime-950 text-sm">
                    {addr.label}
                  </span>

                  {addr.isDefault && (
                    <span className="text-[10px] font-semibold text-orange-600">
                      Default
                    </span>
                  )}
                </div>

                <p className="text-sm text-zinc-600 truncate">{addr.address}</p>

                <p className="text-xs text-zinc-500">
                  {addr.city}, {addr.state} {addr.zip}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className=" gap-3 mt-6 mb-2 ">
        <Link
          to="/addresses"
          className="px-6 py-3 mb-5 border border-gray-200 bg-white text-zinc-500 rounded-lg flex items-center justify-center gap-2 "
        >
          Add New Address
          <PlusIcon className="size-4" />
        </Link>

        <button
          onClick={() => {
            setStep("payment");
            scrollTo(0, 0);
          }}
          disabled={!address?.address}
          className="px-6 py-3 bg-lime-950 text-white rounded-xl flex items-center gap-2 disabled:opacity-60"
        >
          Continue to Payment
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};

export default CheckoutAddress;
