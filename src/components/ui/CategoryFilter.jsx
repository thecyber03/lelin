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
              ? "bg-black text-white border-black"
              : "bg-white text-black border-gray-300"
          } transition-all`}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
