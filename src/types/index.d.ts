export interface IUser {
  username: string;
  email: string;
  password: string;
}
//  form Validation
export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;



export interface IUserLoginCredentials {
  email: string;
  password: string;
}

export enum Category {
  Clothing = "Clothing",
  Footwear = "Footwear",
  Accessories = "Accessories",
  Jewelry = "Jewelry",
  Bags = "Bags",
  Outerwear = "Outerwear",
  Sportswear = "Sportswear",
  Lingerie = "Lingerie",
}

// types/FashionProduct.ts

interface Image {
  url: string;
  alt: string;
}

interface Ratings {
  average: number;
  count: number;
}

export interface FashionProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: 
    | "Clothing"
    | "Footwear"
    | "Accessories"
    | "Jewelry"
    | "Bags"
    | "Outerwear"
    | "Sportswear"
    | "Lingerie";
  images: Image[];
  sizes: string[];
  colors: string[];
  stock: number;
  brand: string;
  ratings: Ratings;
  createdAt: Date;
  updatedAt: Date;
}

export type SearchParamProductIdProps = {
  params: {
    id: string;
  };
};
//  cart

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export interface CartState {
  items: CartItem[];
}


export interface RootState {
  counter: {
    value: number;
  };
  cartAct: CartState;
}

export type SessionData = {
  user: {
    id: string;
    email?: string;
  };
  expires: string;
};