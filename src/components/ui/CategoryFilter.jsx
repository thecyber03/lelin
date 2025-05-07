import React from 'react'

const CategoryFilter = ({ categories, activeCategory, onFilter }) => {
  return (
    <div className="w-full overflow-hidden overflow-x-scroll scrollbar-none flex gap-3 py-4 lg:gap-2">
      {categories.map((item) => (
        <button
          key={item}
          onClick={() => onFilter(item)}
          className={`px-2 py-1 whitespace-nowrap rounded-md border lg:text-xs ${
            activeCategory === item
              ? "bg-[#5C899D] text-white border-[#5C899D]"
              : "bg-[#E9E9EA] text-black border-[#000]"
          } transition-all`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
