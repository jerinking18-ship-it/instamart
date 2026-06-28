import React from "react";

interface FilterPanelProps {
  categories: any[];
  category: string;
  minPrice: string;
  maxPrice: string;
  updateFilter: (key: string, value: string) => void;
  clearFilter: () => void;
  hasFilters: boolean;
  organic: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  categories,
  category,
  minPrice,
  maxPrice,
  updateFilter,
  clearFilter,
  hasFilters,
}) => {
  const categoriesWithAll = [
    { slug: "", text: "All Categories" },
    ...categories,
  ];
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-lime-950 mb-3">Categories</h3>
        <div>
          {categoriesWithAll.map((cat: any) => (
            <button
              onClick={() => updateFilter("category", cat.slug)}
              key={cat.slug}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${category === cat.slug ? "bg-lime-950 text-white" : "text-zinc-600 hover:bg-lime-100"}`}
            >
              {cat.text}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-lime-950 mb-3">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <input
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-lime-600  outline-none cursor-pointer"
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => updateFilter("minPrice", e.target.value)}
          />
          <span className="text-lime-600">-</span>
          <input
            className="w-full px-3 py-2 text-sm bg-white rounded-lg border border-lime-600  outline-none cursor-pointer"
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => updateFilter("maxPrice", e.target.value)}
          />
        </div>
      </div>
      {hasFilters && (
        <button
          onClick={clearFilter}
          className="w-full py-2 text-orange-600 hover:bg-orange-200 rounded transition-cols font-medium text-sm"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
};

export default FilterPanel;
