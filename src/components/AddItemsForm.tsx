"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Key, useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@/types"; // Make sure this is correctly imported
import e from "express";
import { createUser } from "@/lib/actions/auth.action";
import { UploadButton } from "@/utils/uploadthing";
import {useRouter} from "next/navigation";
import Image from "next/image";
// import { addProduct } from "@/lib/actions/product.action";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  price: z.coerce.number().min(0, {
    message: "Price must be at least 0.",
  }),
  // Uncomment this if using category as nativeEnum
  // category: z.nativeEnum(Category),
  images: z.array(
    z.object({
      url: z.string().url({ message: "Invalid URL." }),
      alt: z
        .string()
        .min(2, { message: "Alt text must be at least 2 characters." }),
      key: z
        .string()
        .min(2, { message: "Alt text must be at least 2 characters." }),
    })
  ),
  sizes: z.array(
    z.string().min(1, { message: "Size must be at least 1 character." })
  ),
  colors: z.array(
      z.string().min(1, { message: "Color must be at least 1 character." })
    ),
    stock: z.coerce.number().min(0, { message: "Stock must be at least 0." }),
    brand: z.string().min(2, { message: "Brand must be at least 2 characters." }),
});


export function AddItemsForm() {
  const [uploadedImages, setUploadedImages] = useState<
    { url: string; alt: string; key: string }[]
  >([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [newSize, setNewSize] = useState("");
  const [newColor, setNewColor] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      title: "",
      description: "",
      price: 0,
      images: [{ url: "", alt: "" }],
      sizes: [""],
      colors: [""],
      stock: 0,
      brand: "",
    },
  });

  const onSubmit = async (data: any) => {
    //   const onSubmit = async (data: any) => {
    const formData = new FormData();
    // Append form fields to FormData
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("stock", data.stock.toString());
    formData.append("brand", data.brand);
    // Append images to FormData
    // uploadedImages.forEach((image, index) => {
    const imageList = uploadedImages.map((image) => {
      return {
        url: image.url,
        alt: image.alt,
      };
    });
    // uploadedImages.forEach((image, index) => {
    //   formData.append(`images[${index}][url]`, image.url);
    //   formData.append(`images[${index}][alt]`, image.alt);
    //   formData.append(`images[${index}][key]`, image.key);
    // });
    const colorsList = colors.map((color) => color);
    const sizesList = sizes.map((size) => size);
    formData.append("images", JSON.stringify(imageList));
    // formData.append(`images[${index}][alt]`, image.alt);
    // });
    // Append sizes and colors (as comma-separated strings)
    formData.append("sizes", JSON.stringify(sizesList));
    formData.append("colors", JSON.stringify(colorsList));
    try {
      // Example: Simulate form submission
      console.log("FormData:", Object.fromEntries(formData.entries()));

      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      console.log("Response:", await response.json());

      // const response = await axios.post("/api/addProduct", formData);
      // console.log("Response:", response.data);
      router.refresh(); // Refresh the page
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageUpload = (res: any) => {
    if (res && res[0]) {
      const { url, name, key } = res[0];
      setUploadedImages((prev) => [...prev, { url, alt: name, key }]);
    }
  };
  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addSize = () => {
    if (newSize && !sizes.includes(newSize)) {
      setSizes((prev) => [...prev, newSize]);
      setNewSize("");
    }
  };
  const removeSize = (size: string) => {
    setSizes((prev) => prev.filter((s) => s !== size));
  };
    const addColor = () => {
      if (newColor && !colors.includes(newColor)) {
        setColors((prev) => [...prev, newColor]);
        setNewColor("");
      }
    };
  const removeColor = (color: string) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  return (
    <div className="min-h-screen overflow-y-auto">
      <Form {...form}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form.getValues());
          }}
          className="space-y-1"
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Product Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Product Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Price */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizes"
            render={() => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <div
                      key={size}
                      className="flex items-center bg-gray-100 rounded-md p-2"
                    >
                      <span>{size}</span>
                      <button
                        type="button"
                        onClick={() => removeSize(size)}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2">
                  <Input
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value)}
                    placeholder="Add new size"
                    className="mr-2"
                  />
                  <Button type="button" onClick={addSize}>
                    Add Size
                  </Button>
                </div>
              </FormItem>
            )}
          />
          {/* Colors */}
          <FormField
            control={form.control}
            name="colors"
            render={() => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className="flex items-center bg-gray-100 rounded-md p-2"
                    >
                      <span>{color}</span>
                      <button
                        type="button"
                        onClick={() => removeColor(color)}
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex mt-2">
                  <Input
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    placeholder="Add new color"
                    className="mr-2"
                  />
                  <Button type="button" onClick={addColor}>
                    Add Color
                  </Button>
                </div>
              </FormItem>
            )}
          />
          {/* Stock */}
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Brand */}
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brand</FormLabel>
                <FormControl>
                  <Input placeholder="Brand Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleImageUpload}
            onUploadError={(error: Error) =>
              alert(`Upload Error: ${error.message}`)
            }
          />
          {uploadedImages.length > 0 && (
            <div className="image-preview">
              {uploadedImages.map((img, index) => (
                <div key={img.key} className="image-item">
                  <Image src={img.url} alt={img.alt} width={100} height={100} />
                  <button onClick={() => removeImage(index)}>Remove</button>
                </div>
              ))}
            </div>
          )}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

//  --------------------------------

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { UploadButton } from "@/utils/uploadthing";

// const formSchema = z.object({
//   title: z.string().min(2, "Title must be at least 2 characters."),
//   description: z.string().min(2, "Description must be at least 2 characters."),
//   price: z.coerce.number().min(0, "Price must be at least 0."),
//   images: z.array(
//     z.object({
//       url: z.string().url("Invalid URL."),
//       alt: z.string().min(2, "Alt text must be at least 2 characters."),
//     })
//   ),
//   sizes: z.array(z.string().min(1, "Size must be at least 1 character.")),
//   colors: z.array(z.string().min(1, "Color must be at least 1 character.")),
//   stock: z.coerce.number().min(0, "Stock must be at least 0."),
//   brand: z.string().min(2, "Brand must be at least 2 characters."),
// });

// export function AddItemsForm() {
//   const [uploadedImages, setUploadedImages] = useState<
//     { url: string; alt: string; key: string }[]
//   >([]);
//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       price: 0,
//       images: [],
//       sizes: [""],
//       colors: [""],
//       stock: 0,
//       brand: "",
//     },
//   });

//   const handleImageUpload = (res: any) => {
//     if (res && res[0]) {
//       const { url, name, key } = res[0];
//       setUploadedImages((prev) => [...prev, { url, alt: name, key }]);
//     }
//   };

//   const onSubmit = async (data: any) => {
//     const formData = new FormData();

//     // Append form fields to FormData
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("price", data.price.toString());
//     formData.append("stock", data.stock.toString());
//     formData.append("brand", data.brand);

//     // Append images to FormData
//     uploadedImages.forEach((image, index) => {
//       formData.append(`images[${index}][url]`, image.url);
//       formData.append(`images[${index}][alt]`, image.alt);
//     });

//     // Append sizes and colors (as comma-separated strings)
//     formData.append("sizes", data.sizes.join(","));
//     formData.append("colors", data.colors.join(","));

//     try {
//       // Example: Simulate form submission
//       console.log("FormData:", Object.fromEntries(formData.entries()));
//       // const response = await axios.post("/api/addProduct", formData);
//       // console.log("Response:", response.data);

//       router.refresh(); // Refresh the page
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const removeImage = (index: number) => {
//     setUploadedImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="min-h-screen overflow-y-auto">
//       <Form {...form}>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             onSubmit(form.getValues());
//           }}
//           className="space-y-4"
//         >
//           {/* Title */}
//           <FormField
//             control={form.control}
//             name="title"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Title</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Product Title" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Description */}
//           <FormField
//             control={form.control}
//             name="description"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Description</FormLabel>
//                 <FormControl>
//                   <Input placeholder="Product Description" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//           {/* Images Upload */}
//           <UploadButton
//             endpoint="imageUploader"
//             onClientUploadComplete={handleImageUpload}
//             onUploadError={(error: Error) =>
//               alert(`Upload Error: ${error.message}`)
//             }
//           />

//           {uploadedImages.length > 0 && (
//             <div className="image-preview">
//               {uploadedImages.map((img, index) => (
//                 <div key={img.key} className="image-item">
//                   <Image src={img.url} alt={img.alt} width={100} height={100} />
//                   <button onClick={() => removeImage(index)}>Remove</button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   );
// }

// -----------------------------
// "use client"
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { UploadButton } from "@/utils/uploadthing";

// const formSchema = z.object({
//   title: z.string().min(2, "Title must be at least 2 characters."),
//   description: z.string().min(2, "Description must be at least 2 characters."),
//   price: z.coerce.number().min(0, "Price must be at least 0."),
//   images: z.array(
//     z.object({
//       url: z.string().url("Invalid URL."),
//       alt: z.string().min(2, "Alt text must be at least 2 characters."),
//       key: z.string().min(2, "Key must be at least 2 characters."),
//     })
//   ),
//   sizes: z.array(z.string().min(1, "Size must be at least 1 character.")),
//   colors: z.array(z.string().min(1, "Color must be at least 1 character.")),
//   stock: z.coerce.number().min(0, "Stock must be at least 0."),
//   brand: z.string().min(2, "Brand must be at least 2 characters."),
// });

// export function AddItemsForm() {
//   const [uploadedImages, setUploadedImages] = useState<
//     { url: string; alt: string; key: string }[]
//   >([]);
//   const [sizes, setSizes] = useState<string[]>([]);
//   const [colors, setColors] = useState<string[]>([]);
//   const [newSize, setNewSize] = useState("");
//   const [newColor, setNewColor] = useState("");
//   const router = useRouter();

//   const form = useForm({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       price: 0,
//       images: [],
//       sizes: [],
//       colors: [],
//       stock: 0,
//       brand: "",
//     },
//   });

//     const handleImageUpload = (res: any) => {
//       if (res && res[0]) {
//         const { url, name, key } = res[0];
//         setUploadedImages((prev) => [...prev, { url, alt: name, key }]);
//       }
//     };
//       const removeImage = (index: number) => {
//         setUploadedImages((prev) => prev.filter((_, i) => i !== index));
//       };

//   const addSize = () => {
//     if (newSize && !sizes.includes(newSize)) {
//       setSizes((prev) => [...prev, newSize]);
//       setNewSize("");
//     }
//   };

//   const removeSize = (size: string) => {
//     setSizes((prev) => prev.filter((s) => s !== size));
//   };

//   const addColor = () => {
//     if (newColor && !colors.includes(newColor)) {
//       setColors((prev) => [...prev, newColor]);
//       setNewColor("");
//     }
//   };

//   const removeColor = (color: string) => {
//     setColors((prev) => prev.filter((c) => c !== color));
//   };

//   const onSubmit = async (data: any) => {
//     const formData = new FormData();

//     // Append form fields to FormData
//     formData.append("title", data.title);
//     formData.append("description", data.description);
//     formData.append("price", data.price.toString());
//     formData.append("stock", data.stock.toString());
//     formData.append("brand", data.brand);

//     // Append images, sizes, and colors
//     formData.append("images", JSON.stringify(uploadedImages));
//     formData.append("sizes", JSON.stringify(sizes));
//     formData.append("colors", JSON.stringify(colors));

//     try {
//       console.log("FormData:", Object.fromEntries(formData.entries()));

//       const response = await fetch("/api/addProduct", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(Object.fromEntries(formData.entries())),
//       });
//       console.log("Response:", await response.json());

//       router.refresh();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen overflow-y-auto">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//           {/* Existing form fields */}
//           {/* ... */}

//           {/* Sizes */}
//           <FormField
//             control={form.control}
//             name="sizes"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Sizes</FormLabel>
//                 <div className="flex flex-wrap gap-2">
//                   {sizes.map((size) => (
//                     <div
//                       key={size}
//                       className="flex items-center bg-gray-100 rounded-md p-2"
//                     >
//                       <span>{size}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeSize(size)}
//                         className="ml-2 text-red-500"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex mt-2">
//                   <Input
//                     value={newSize}
//                     onChange={(e) => setNewSize(e.target.value)}
//                     placeholder="Add new size"
//                     className="mr-2"
//                   />
//                   <Button type="button" onClick={addSize}>
//                     Add Size
//                   </Button>
//                 </div>
//               </FormItem>
//             )}
//           />

//           {/* Colors */}
//           <FormField
//             control={form.control}
//             name="colors"
//             render={() => (
//               <FormItem>
//                 <FormLabel>Colors</FormLabel>
//                 <div className="flex flex-wrap gap-2">
//                   {colors.map((color) => (
//                     <div
//                       key={color}
//                       className="flex items-center bg-gray-100 rounded-md p-2"
//                     >
//                       <span>{color}</span>
//                       <button
//                         type="button"
//                         onClick={() => removeColor(color)}
//                         className="ml-2 text-red-500"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex mt-2">
//                   <Input
//                     value={newColor}
//                     onChange={(e) => setNewColor(e.target.value)}
//                     placeholder="Add new color"
//                     className="mr-2"
//                   />
//                   <Button type="button" onClick={addColor}>
//                     Add Color
//                   </Button>
//                 </div>
//               </FormItem>
//             )}
//           />

//           {/* Image upload and preview */}
//           <UploadButton
//             endpoint="imageUploader"
//             onClientUploadComplete={handleImageUpload}
//             onUploadError={(error) => alert(`Upload Error: ${error.message}`)}
//           />

//           {uploadedImages.length > 0 && (
//             <div className="image-preview">
//               {uploadedImages.map((img, index) => (
//                 <div key={img.key} className="image-item">
//                   <Image src={img.url} alt={img.alt} width={100} height={100} />
//                   <button type="button" onClick={() => removeImage(index)}>
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
