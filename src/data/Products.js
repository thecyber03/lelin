// const productApi = `${import.meta.env.VITE_ADMIN_PANEL_URI}/nasara`

// export async function fetchProducts() {
//   try {
//     const response = await fetch(productApi); 
//     const data = await response.json();

//     return data //data
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }

const productApi = `${import.meta.env.VITE_ADMIN_PANEL_URI}/nasara`;

export async function fetchProducts() {
  try {
    // Fetch Nasara API separately, allowing failure
    let nasaraData = [];
    try {
      const nasaraRes = await fetch(productApi);
      if (nasaraRes.ok) {
        nasaraData = await nasaraRes.json();
      } else {
        console.warn("Nasara API failed:", nasaraRes.status);
      }
    } catch (err) {
      console.warn("Nasara API unreachable:", err.message);
    }

    // Fetch DummyJSON API separately
    const dummyRes = await fetch("https://dummyjson.com/products");
    const dummyData = await dummyRes.json();

    // Mapping DummyJSON data
    const formattedDummyData = dummyData.products.map(product => ({
      _id: product.id.toString(),
      title: product.title,
      price: (product.price * 50).toFixed(2),
      originalPrice: (product.price * 90).toFixed(2),
      category: product.category || "Other",
      quantity: 1,
      unit: "piece",
      description: product.description,
      author: "ii.bbs",
      images: product.images || [product.thumbnail],
      published: true,
    }));

    // Merging both product lists (Nasara + Dummy)
    return [...nasaraData, ...formattedDummyData];

  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

