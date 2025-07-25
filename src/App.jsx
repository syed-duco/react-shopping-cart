import { useEffect, useState } from "react";
import ProductList from "./components/ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:8000/products");
        if (!res.ok) throw new Error("Unable to fetch the products");
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.log("Error while fetching products: ", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
      {loading && <p>loading...</p>}
      {error && <div className="error"> {error}</div>}
      <ProductList products={products} />
    </div>
  );
}

export default App;
