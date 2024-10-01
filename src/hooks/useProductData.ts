import { useState, useEffect } from "react";
import axios from "axios";

const useProductData = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("fetching products");
        const response = await axios.get("/api/getProducts");
        setProducts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProductData;
