import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Import Heroicons
import { useProducts } from "../API/ProductContext.jsx";
import Card from "../components/ui/Card.jsx";
import ProductView from "./ProductView.jsx";

export default function Search() {
  const { products } = useProducts();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(useLocation().search).get("q") || "";
  const [query, setQuery] = useState(searchQuery);
  const [selectedProduct, setSelectedProduct] = useState(products[0]); // ✅ Default to first product
  const inputRef = useRef(null);
 
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    navigate(value ? `/s/?q=${encodeURIComponent(value)}` : "/s");
  };

  // Filter products based on searchQuery
  const searchedProducts = products.filter(({ title = "", category = "" }) =>
    searchQuery ? [title, category].some((field) => field.toLowerCase().includes(searchQuery.toLowerCase())) : true
  );

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Left Side: Search and Results (60%) */}
      <div className="w-full lg:w-[60%]">
        {/* Search Box */}
        <div className="mx-4 flex items-center border border-gray-300 rounded-md p-2">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            ref={inputRef}
            type="search"
            placeholder="Search products..."
            className="ml-2 w-full outline-none placeholder-gray-500"
            value={query}
            onChange={handleSearch}
          />
        </div>

        {/* Search Results */}
        <p className="mx-4 text-lg py-3 font-bold">Search Result</p>
        <div className="mt-4 px-1 grid grid-cols-2 gap-1 lg:grid-cols-4">
        
          {searchedProducts.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (searchQuery ? (
            searchedProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
                onSelectProduct={() => setSelectedProduct(product)} // ✅ Update ProductView on click
              />
            ))
          ): null)}
        </div>
      </div>

      {/* Right Side: Product View (40%) - Only on Large Screens */}
      <div className="hidden lg:block w-[40%] border-l p-4">
        {selectedProduct ? (
          <ProductView product={selectedProduct} />
        ) : (
          <p className="text-gray-500 text-center">Click a product to view details.</p>
        )}
      </div>
    </div>
  );
}
