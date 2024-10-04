"use server";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/User";
import { handleError } from "../utils";
import dbConnect from "../db";
import { IUser, IUserLoginCredentials } from "@/types";
import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// import { LoginFormData } from "@/app/(auth)/login/page";
// import { signIn } from "@/auth";
// CREATE USER
export const createUser = async (user: IUser) => {
  try {
    await dbConnect();
    const newUser = await UserModel.create(user);
    await newUser.save();
    return {
      statusCode: 200,
      user: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    handleError(error);
  }
};

// LOGIN USER
export const loginUser = async (user: IUserLoginCredentials) => {
  try {
    await dbConnect();

    const foundUser = await UserModel.findOne({ email: user.email });

    if (!foundUser) {
      return { statusCode: 401, message: "User not found" };
    }

    // const isPasswordMatch = await bcrypt.compare(user.password, foundUser.password);
    const isPasswordMatch = user.password === foundUser.password;
    console.log(isPasswordMatch);

    if (!isPasswordMatch) {
      return { statusCode: 401, message: "Invalid credentials" };
    }
    return {
      statusCode: 200,
      user: JSON.parse(JSON.stringify(foundUser)),
    };
  } catch (error) {
    handleError(error);
  }
};

// logout user

export const logoutUser = async ()=>{
  try{
    await dbConnect();
    return {statusCode:200,message:"User logged out successfully"};
  }
  catch(error){
    handleError(error);
  }
}


// export async function doCredentialLogin(formData: FormData) {
//   console.log("formData", formData);

//   try {
//     // const response = await signIn("credentials", {
//     //   email: formData.get("email"),
//     //   password: formData.get("password"),
//     //   redirect: false,
//     // });
//     // return response;
//     console.log(formData.get("email"));
//     console.log(formData.get("password"));
//   } catch (err) {
//     throw err;
//   }
// }

export async function logoutUserFromServer() {
  try {
    const response = await signOut();
    // revalidatePath("/login");
    
    return response;
  } catch (error) {
    return error;
  }
}

export async function doCredentialLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    revalidatePath("/");
    return response;
  } catch (err) {
    throw err;
  }

}



