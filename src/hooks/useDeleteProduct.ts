import { useState } from "react";
import axios from "axios";

const useDeleteProduct = () => {
  const [loadingDel, setloadingDel] = useState(false);
  const [errorDel, seterrorDel] = useState<string | null>(null);
  const [successDel, setsuccessDel] = useState(false);

  const handleDelete = async (productId: string) => {
    setloadingDel(true);
    seterrorDel(null);
    setsuccessDel(false);

    try {
      const deleteResponse = await axios.delete(
        `/api/deleteProduct?id=${productId}`
      );
      if (deleteResponse.status === 200) {
        setsuccessDel(true);
        console.log("Product deleted successDelfully");
      } else {
        seterrorDel("Failed to delete product");
      }
    } catch (err) {
      seterrorDel("An errorDel occurred while deleting the product");
    } finally {
      setloadingDel(false);
    }
  };

  return { handleDelete, loadingDel, errorDel, successDel };
};

export default useDeleteProduct;
