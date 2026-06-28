import React from "react";

import { Link } from "react-router-dom";
import { categoriesData } from "../../assets";

const HomeCategories: React.FC = () => {
  return (
    <section>
      <div className="bg-orange-700 text-3xl text-white mt-4 mb-4 pt-3 pb-3 pl-5 rounded">
        {" "}
        Category
      </div>
      <div className="flex items-center mt-4  overflow-x-scroll no-scrollbar ">
        {categoriesData.map((cat) => (
          <Link
            key={cat.slug}
            to={`/products?category=${cat.slug}`}
            onClick={() => window.scrollTo(0, 0)}
            className="group flex flex-col items-center gap-3 p-4"
          >
            <div className="size-20 sm:size-26 sm:p-2 rounded overflow-hidden bg-orange-200 group-hover:ring-2 ring-orange-300/75 transition-all">
              <img
                className="w-full h-full object-contain transition-all"
                src={cat.Image}
                alt={cat.text}
              />
            </div>
            <span className="text-xs font-medium text-zinc-600 text-center leading-tight">
              {cat.text}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeCategories;
