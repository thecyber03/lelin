import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../API/CartContext.jsx";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import HamburgerMenu from './ui/HamburgerMenu.jsx'
import NavbarMenu from "./NavbarMenu.jsx";
import BrandLogo from './ui/BrandLogo.jsx'

export default function Navbar() {
  const { cart } = useCart();
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div>
    <nav className="bg-white fixed top-0 left-0 z-[100] flex justify-between items-center w-full h-16 px-4 ">
      {/* Brand Name */}
      <div className="h-full text-2xl flex items-center">
        <BrandLogo/>
      </div>
      
      <div className="flex items-center gap-8">
        {/*Cart Icon */}
        <Link to="/cart" className="relative">
          <ShoppingBagIcon className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 flex items-center justify-center bg-black text-white text-xs font-semibold rounded-full">
              {cart.length}
            </span>
          )}
        </Link>
        
        {/* Menu Icon */}
         <HamburgerMenu isActive={isActive} setIsActive={setIsActive} />
      </div>
      
    </nav>
       <NavbarMenu isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}


