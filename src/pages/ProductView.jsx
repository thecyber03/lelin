import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../API/ProductContext.jsx";
import Card from "../components/ui/Card.jsx";
import AddToCartButton from "../components/ui/AddToCartButton.jsx";

export default function ProductView({ product: selectedProduct, onSelectProduct }) {
  const { id } = useParams();
  const { products } = useProducts();
  const product = selectedProduct || products.find((p) => p._id === id);
  
  // ✅ Ensure product exists before setting state
  const [selectedImg, setSelectedImg] = useState(null);
 
  // ✅ Set the first image when product data is available
  useEffect(() => {
    if (product?.images?.length) {
      setSelectedImg(product.images[0]); // Set first image as default
    }
  }, [product]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const relatedProducts = products.filter((p) => p.category === product.category && p._id !== product._id);
  const exploreProducts = products.filter((p) => p.category !== product.category);
  
  return (
    <div className="p-4">
      {/* ✅ Product Image */}
      <div className="w-full h-80 flex justify-center items-center">
        <img src={selectedImg} loading="lazy" className="h-full w-auto object-contain"/>
      </div>

      {/* ✅ Thumbnails */}
      <div className="mb-4 bg-[#5C899D] h-24 w-full rounded flex gap-2 p-2 overflow-x-auto">
        {product.images?.map((img, i) => (
          <img key={i} src={img} loading="lazy" 
            className={`h-20 w-20 object-cover rounded cursor-pointer border ${
              selectedImg === img ? "border-white" : "border-transparent"
            }`}
            onClick={() => setSelectedImg(img)}
          />
        ))}
      </div>


      {/* ✅ Title appears after image */}
      <h1 className="text-2xl font-bold text-black">{product.title}</h1>

      <p className="text-gray-500 text-xs">{product.quantity || 500} {product.unit || "gm"}</p>

      <div className="flex justify-between items-center">
        <p className="text-black font-semibold text-lg">₹{product.price}</p>
        <AddToCartButton product={product} />
      </div>

      <p className="text-gray-600 text-xs">@{product.author}</p>

      {/* ✅ Product Description - Ensures it's always displayed */}
      <div className="mt-4 border-t pt-4">
        <h2 className="text-lg font-semibold text-black">Product Description</h2>
        <p className="text-gray-600 text-sm mt-2" dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, "<br/>") }} />
     </div>

      {/* ✅ Related Products Section */}
      {relatedProducts.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-black">Related Products</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {relatedProducts.map((item) => (
              <div key={item._id} className="w-1/2 min-w-[50%]">
                <Card product={item} onSelectProduct={onSelectProduct} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className=" text-sm mt-4 text-black">No related products found.</p>
      )}

      {/* ✅ Explore More Section (Already Working) */}
      {exploreProducts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-black">Explore More</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {exploreProducts.map((item) => (
              <div key={item._id} className="w-1/2 min-w-[50%]">
                <Card product={item} onSelectProduct={onSelectProduct} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
