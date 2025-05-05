import { useState } from "react";

export default function HamburgerMenu({isActive, setIsActive}) {

  function handleClick() {
    setIsActive(!isActive);
  }

  return (
    <div>
      {/* Hamburger Container */}
      <div onClick={handleClick} className="w-16 h-5 relative cursor-pointer">
        {/* TOP LINE */}
        <div
          className={`w-full h-[1.5px] bg-white absolute top-[30%] transition-transform duration-200 origin-left
            ${isActive ? "rotate-[6.5deg]" : "rotate-0"}
          `}
        ></div>
        {/* BOTTOM LINE */}
        <div
          className={`w-full h-[1.4px] bg-white absolute bottom-[30%] transition-transform duration-200 origin-left
           ${isActive ? "-rotate-[6.5deg]" : "rotate-0"}
          `}
        ></div>
      </div>
    </div>
  );
}