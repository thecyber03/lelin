import { useState, useEffect } from "react";
import CategoryFilter from "../components/ui/CategoryFilter.jsx";
import Card from "../components/ui/Card.jsx";
import { useProducts } from "../API/ProductContext.jsx";
import ProductView from "./ProductView.jsx";
import SearchProduct from '../components/ui/SearchProduct.jsx'
import { useLocation } from "react-router-dom";
import Crousel  from "../components/Crousel.jsx";
import GoogleAds from '../components/GoogleAds.jsx'

export default function Home() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(products[0]);
    }
  }, [products]); 
  
  const handleProductClick = (product) => {
    setSelectedProduct(product); // ✅ Large screen should update when clicking a product
  };

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  function handleFilter(category) {
    setActiveCategory(category);
  }
  
  const filteredProducts = products
  .filter((product) => activeCategory === "All" || product.category === activeCategory) // Category filter

   
  return (
   <>

  
    <div className="flex bg-[#E9E9EA]">
      {/* Left Side: Product List (70%) */}
      <div className="w-full lg:w-[60%]">
        <div className="fixed z-[10] pt-4 left-0 w-full bg-[#E9E9EA] px-4 lg:w-[60%]">
          <SearchProduct />
          <div className="overflow-x-auto whitespace-nowrap">
            {products.length === 0 ? (
              <div className="flex gap-2 my-2">
                <button className="px-2 py-1 whitespace-nowrap rounded-md border lg:text-xs bg-black text-white">All</button> 
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-8 w-20 bg-gray-200 rounded-md animate-pulse"></div>
                ))}
              </div>
            ) : (
              <CategoryFilter categories={categories} activeCategory={activeCategory} onFilter={handleFilter} />
            )}
          </div>
        </div>
        
        {/*Crousel*/}
        <div className="mt-32 my-4 w-full h-[40vw] lg:h-[20vw] px-4">
         <Crousel/>
        </div>
        
        
        <div className="px-1 grid grid-cols-2 gap-1 lg:grid-cols-4">
          {products.length === 0
          ? [...Array(8)].map((_, i) => (
              <div key={i} className="p-2 space-y-2 animate-pulse">
                <div className="h-48 bg-gray-200 rounded-md"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                <div className="flex justify-between items-center">
                  <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-8 bg-gray-200 rounded-md w-[40%]"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))
            : filteredProducts.map((product, index) => (
                <Card key={product._id} product={product} onSelectProduct={handleProductClick} />
              ))}
        </div>
        
        <div className="my-4 flex justify-center">
         <GoogleAds/>
        </div>
      </div>

      {/* Right Side: Product View (30%) - Only on Large Screens */}
      <div className="hidden lg:block w-[40%] border-l border-zinc-700 p-4">
        {selectedProduct ? (
          <ProductView product={{...selectedProduct, image: selectedProduct.images[0]}} onSelectProduct={handleProductClick} />
        ) : (
          <p>Select a product to view</p>
        )}
      </div>
     </div>
   </>
  );
}
