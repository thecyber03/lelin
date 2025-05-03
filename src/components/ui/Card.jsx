import { useState } from "react";
import { Link } from "react-router-dom";
import AddToCartButton from "./AddToCartButton.jsx"; 

export default function Card({ product, onSelectProduct }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const Image = (
    <div className="h-48 lg:h-28 overflow-hidden flex justify-center items-center">
      <img
        src={product.images[0]}
        loading="lazy"
        onLoad={() => setImgLoaded(true)}
        className={`h-full w-auto object-contain transition duration-500 ${
          imgLoaded ? "blur-0 opacity-100" : "blur-sm opacity-40"
        }`}
        alt={product.title}
      />
    </div>
  );
  
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="p-2 shadow-sm bg-white cursor-pointer">
      {/* Mobile: Redirect to ProductView */}
      <Link to={`/product/${product._id}`} className="block lg:hidden">
        <div>
          {Image}
          <h3 className="truncate font-medium mt-2 lg:text-xs">
            {product.title}
          </h3>
        </div>
      </Link>

      {/* Large Screens: Update ProductView without redirecting */}
      <div className="hidden lg:block" onClick={() => onSelectProduct(product)}>
        {Image}
        <h3 className="truncate font-medium mt-2 lg:text-xs">
          {product.title}
        </h3>
      </div>

      <p className="text-gray-500 text-xs">{product.quantity || 500} {product.unit || "gm"}</p>

      <div className="flex justify-between items-center mt-2">  
        <span className="font-bold text-green-600">₹{product.price}</span>
        <AddToCartButton product={product} />
      </div>
      <div className="text-sm space-x-1">
        <span className="line-through text-gray-500">₹{product.originalPrice}</span>
        <span className="text-sm text-red-600 font-medium">({discountPercent}% OFF)</span>
      </div>
        

      <p className="text-gray-600 text-xs mt-1 lg:mt-0">@{product.author}</p>
    </div>
  );
}
