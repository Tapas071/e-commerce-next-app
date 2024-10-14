import { useState } from "react";
import axios from "axios";

const useUpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleUpdate = async (productId: string, formattedData: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
        const updateDataResponse = await axios.patch(`/api/updateProduct?id=${productId}`, formattedData);
        const updateData = updateDataResponse.data;
      if (updateData && updateDataResponse.status === 200) {
        setSuccess(true);
        console.log("Product updated successfully");
      } else {
        setError("Failed to update product");
      }
    } catch (err) {
      setError("An error occurred while updating the product");
    } finally {
      setLoading(false);
    }
  };

  return { handleUpdate, loading, error, success };
};

export default useUpdateProduct;
