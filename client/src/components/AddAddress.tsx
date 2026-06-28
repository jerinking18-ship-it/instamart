import { XIcon } from "lucide-react";
import React from "react";

const AddAddress: React.FC<any> = ({
  resetForm,
  handleSubmit,
  form,
  setForm,
  editingId,
}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 bg-black/40" />
      <div
        onClick={resetForm}
        className="fixed inset-0 z-50 flex items-center justify-center  p-4"
      >
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={handleSubmit}
          className="bg-lime-50 rounded-lg p-6 w-full max-w-lg animate-fade-in"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-lime-950 ">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              type="button"
              onClick={resetForm}
              className="p-2 rounded-full hover:bg-orange-200 transition-colors"
            >
              <XIcon className="size-5" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-lime-950 mb-1.5">
                Label
              </label>
              <input
                type="text"
                placeholder="Home, Work, etc."
                required
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-300 outline outline-none focus:border-lime-900 "
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-lime-950 mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                placeholder=""
                required
                className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-300 outline outline-none focus:border-lime-900 "
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-1.5">
                  City
                </label>
                <input
                  type="text"
                  placeholder=""
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-300 outline outline-none focus:border-lime-900 "
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-1.5">
                  State
                </label>
                <input
                  type="text"
                  placeholder=""
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-300 outline outline-none focus:border-lime-900 "
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-lime-950 mb-1.5">
                  ZIP Code
                </label>
                <input
                  type="text"
                  placeholder=""
                  required
                  className="w-full px-4 py-2.5 text-sm rounded-lg border border-zinc-300 outline outline-none focus:border-lime-900 "
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center justify-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isDefault}
                    onChange={(e) =>
                      setForm({ ...form, isDefault: e.target.checked })
                    }
                  />
                  <span className="text-sm">Set as Deafaut</span>
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 w-full py-3 bg-lime-950 text-white rounded-lg hover:bg-lime-600 transition-colors"
          >
            {editingId ? "Update Address" : "Save Address"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddAddress;
