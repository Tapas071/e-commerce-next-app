"use client";

import React, { useEffect, useState } from "react";
import { FashionProduct } from "@/types"; // Assuming you have a type defined for your product data
import { updateProduct } from "@/lib/actions/product.action";
import useUpdateProduct from "@/hooks/useUpdateProduct";

interface EditProductProps {
  product: FashionProduct;
}

const EditProduct: React.FC<EditProductProps> = ({ product }) => {
  const [editableProduct, setEditableProduct] = useState(product);
  const { handleUpdate, loading, error, success } = useUpdateProduct();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableProduct({ ...editableProduct, [name]: value });
  };


 const onUpdateClick = () => {
   handleUpdate(product._id, editableProduct);
 };
 
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <input
          type="text"
          value={editableProduct.title}
          name="title"
          onChange={handleInputChange}
          className="text-xl font-semibold mb-2 w-full border-b border-gray-300 outline-none"
        />
        <textarea
          value={editableProduct.description}
          name="description"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setEditableProduct({ ...editableProduct, [name]: value });
          }}
          className="text-gray-700 mb-3 w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="number"
          value={editableProduct.price}
          name="price"
          onChange={handleInputChange}
          className="text-lg font-bold text-red-600 mb-3 w-full border-b border-gray-300 outline-none"
        />
        <div className="specs">
          <div className="mb-2">
            <strong>Category:</strong>
            <input
              type="text"
              value={editableProduct.category}
              name="category"
              onChange={handleInputChange}
              className="ml-2 border-b border-gray-300 outline-none"
            />
          </div>
          <div className="mb-2">
            <strong>Brand:</strong>
            <input
              type="text"
              value={editableProduct.brand}
              name="brand"
              onChange={handleInputChange}
              className="ml-2 border-b border-gray-300 outline-none"
            />
          </div>
          <div className="mb-2">
            <strong>Stock:</strong>
            <input
              type="number"
              value={editableProduct.stock}
              name="stock"
              onChange={handleInputChange}
              className="ml-2 border-b border-gray-300 outline-none"
            />
          </div>
          <div className="mb-2">
            <strong>Sizes:</strong>
            <input
              type="text"
              value={editableProduct.sizes.join(", ")}
              name="sizes"
              onChange={(e) =>
                setEditableProduct({
                  ...editableProduct,
                  sizes: e.target.value.split(","),
                })
              }
              className="ml-2 border-b border-gray-300 outline-none"
            />
          </div>
          <div className="mb-2">
            <strong>Colors:</strong>
            <input
              type="text"
              value={editableProduct.colors.join(", ")}
              name="colors"
              onChange={(e) =>
                setEditableProduct({
                  ...editableProduct,
                  colors: e.target.value.split(","),
                })
              }
              className="ml-2 border-b border-gray-300 outline-none"
            />
          </div>
        </div>
        {/* Update Button */}
        <div>
          {/* Your form or UI for editing the product */}
          <button onClick={onUpdateClick} disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && (
            <p style={{ color: "green" }}>Product updated successfully</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
