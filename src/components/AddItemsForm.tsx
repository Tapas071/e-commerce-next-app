"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCallback } from "react";
import { useDropzone, Accept } from "react-dropzone";
import axios from "axios";

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
import { addProduct } from "@/lib/actions/product.action";

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


export function ProfileForm() {
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

  

  const onSubmit = async  (data: any) => {
    alert("Submitted!");
    console.log(data);
    console.log("Submitted!");
    try {
        const SampleJSON = {
          title: data.title,
          description: data.description,
          price: parseFloat(data.price), // Convert price to a number
          category: "Footwear", // Assign a default or appropriate category
          images: data.images.map((image: { url: string; alt: string; }) => ({
            url: image.url,
            alt: image.alt,
          })),
          sizes: data.sizes,
          colors: data.colors,
          stock: parseInt(data.stock, 10), // Convert stock to a number
          brand: data.brand,
          ratings: {
            average: 0, // Set default or appropriate value for average
            count: 0, // Set default or appropriate value for count
          },
          createdAt: new Date().toISOString(), // Set current date
          updatedAt: new Date().toISOString(), // Set current date
        };

      const response = axios.post("/api/addProduct", SampleJSON);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div className="min-h-screen overflow-y-auto">
      <Form {...form}>
        <form onSubmit={
        (e)=>{
            e.preventDefault()
            onSubmit(form.getValues());
        }

        } className="space-y-1">
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

          {/* Images */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => {
              interface ImageFile {
                url: string;
                alt: string;
              }

              const onDrop = useCallback(
                (acceptedFiles: File[]) => {
                  const newImages: ImageFile[] = acceptedFiles.map((file) => ({
                    url: URL.createObjectURL(file),
                    alt: file.name,
                  }));
                  field.onChange([...field.value, ...newImages]);
                },
                [field]
              );

              const { getRootProps, getInputProps, isDragActive } = useDropzone(
                {
                  onDrop,
                  accept: { "image/*": [] } as Accept, // Accept only image files
                }
              );

              const removeImage = (index: number) => {
                const updatedImages = [...field.value];
                updatedImages.splice(index, 1);
                field.onChange(updatedImages);
              };

              return (
                <FormItem>
                  <FormLabel>Images</FormLabel>

                  <div
                    {...getRootProps()}
                    className={`p-4 border-2 border-dashed rounded-md cursor-pointer ${
                      isDragActive ? "border-blue-500" : "border-gray-300"
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the images here...</p>
                    ) : (
                      <p>Drag and drop images here, or click to select files</p>
                    )}
                  </div>

                  {/* Display the uploaded images */}
                  {field.value.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {field.value.map((image, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-4"
                        >
                          <img
                            src={image.url}
                            alt={image.alt}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <FormControl>
                            <Input
                              placeholder="Alt text"
                              value={image.alt}
                              onChange={(e) => {
                                const newImages = [...field.value];
                                newImages[index].alt = e.target.value;
                                field.onChange(newImages);
                              }}
                            />
                          </FormControl>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Sizes */}
          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., M, L, XL"
                    value={field.value.join(", ")} // Display the array as a comma-separated string
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const sizeArray = inputValue
                        .split(",")
                        .map((size) => size.trim());
                      field.onChange(sizeArray);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Colors */}
          <FormField
            control={form.control}
            name="colors"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Colors</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Red, Blue"
                    value={field.value.join(", ")} // Display the array as a comma-separated string
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const colorArray = inputValue
                        .split(",")
                        .map((color) => color.trim());
                      field.onChange(colorArray);
                    }}
                  />
                </FormControl>
                <FormMessage />
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

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
